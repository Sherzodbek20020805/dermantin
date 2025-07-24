import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserInput } from '../user/dto/login-user.input';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthServiceUser {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(input: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOne({
      where: { email: input.email },
    });
    if (existing) throw new ConflictException('user already exists');

    const hashedPassword = await bcrypt.hash(input.password, 7);
    const user = this.userRepo.create({
      ...input,
      hashed_password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async login(
    input: LoginUserInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.findOne({
      where: { email: input.email },
    });
    if (
      !user ||
      !(await bcrypt.compare(input.password, user.hashed_password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    user.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.userRepo.save(user);
    return tokens;
  }

  async logout(userId: number): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new ForbiddenException('user not found');
    user.hashed_refresh_token = null;
    await this.userRepo.save(user);
    return { message: 'Logged out successfully' };
  }

  async refresh(userId: number, refreshToken: string) {
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token is missing');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.hashed_refresh_token) {
      throw new ForbiddenException('Access denied');
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!isValid) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const tokens = await this.generateTokens(user);
    user.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.userRepo.save(user);

    return tokens;
  }

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_verifid: user.is_verifid,
      is_role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
