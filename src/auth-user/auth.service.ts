import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';


@Injectable()
export class UsersAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      role: user.role,
      is_verified: user.is_verified,
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

  async register(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByPhone(createUserDto.phone);
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
  
    const user = await this.usersService.create(createUserDto);
    return { userId: user.id };
  }

  

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersService.findByPhone(loginUserDto.phone);
    if (!user) {
      throw new UnauthorizedException('Telefon raqam noto‘g‘ri');
    }
  
    // Parol yo'q, shuning uchun bu yerda boshqa tekshiruv qo‘shamiz (masalan: is_verified)
    if (!user.is_verified) {
      throw new ForbiddenException('Foydalanuvchi hali tasdiqlanmagan');
    }
  
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
  
  
    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
  
    return { userId: user.id, accessToken };
  }
  

  // async logout(refreshToken: string, res: Response) {
  //   let userData: any;
  //   try {
  //     userData = await this.jwtService.verify(refreshToken, {
  //       secret: process.env.REFRESH_TOKEN_KEY,
  //     });
  //   } catch (error) {
  //     throw new BadRequestException('Noto‘g‘ri refresh token');
  //   }

  //   if (!userData) {
  //     throw new ForbiddenException('Foydalanuvchi topilmadi');
  //   }

  //   await this.usersService.updateRefreshToken(userData.id, null);
  //   res.clearCookie('refreshToken');

  //   return {
  //     message: 'Foydalanuvchi tizimdan chiqdi',
  //   };
  // }
}
