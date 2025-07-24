import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAdminInput } from '../admin/dto/create-admin.dto';
import { LoginAdminInput } from '../admin/dto/login-admin.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async register(input: CreateAdminInput): Promise<Admin> {
    const existing = await this.adminRepo.findOne({
      where: { email: input.email },
    });
    if (existing) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(input.password, 7);
    const admin = this.adminRepo.create({
      ...input,
      hashed_password: hashedPassword,
    });

    return this.adminRepo.save(admin);
  }

  async login(
    input: LoginAdminInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const admin = await this.adminRepo.findOne({
      where: { email: input.email },
    });
    if (
      !admin ||
      !(await bcrypt.compare(input.password, admin.hashed_password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(admin);
    admin.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.adminRepo.save(admin);
    return tokens;
  }

  async logout(adminId: number): Promise<{ message: string }> {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new ForbiddenException('Admin not found');
    admin.hashed_refresh_token = null;
    admin.is_active = false;
    await this.adminRepo.save(admin);
    return { message: 'Logged out successfully' };
  }

  async refresh(adminId: number, refreshToken: string) {
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token is missing');
    }

    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new ForbiddenException('Access denied');
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!isValid) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const tokens = await this.generateTokens(admin);
    admin.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.adminRepo.save(admin);

    return tokens;
  }

  private async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
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
