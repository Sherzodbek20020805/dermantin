import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { AdminsService } from "../admins/admins.service";
import { Admin } from "../admins/entities/admin.entity";
import { CreateAdminInput } from "../admins/dto/create-admin.dto";
import { LoginAdminDto } from "../admins/dto/login-admin.dto";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminsService
  ) {}

  async generateTokens(admin: Admin) {
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

  async registration(createAdminDto: CreateAdminInput) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);
    if (candidate) {
      throw new ConflictException("This user already exists");
    }

    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin.id };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  
    const isMatch = await bcrypt.compare(loginAdminDto.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  
    const { accessToken, refreshToken } = await this.generateTokens(admin);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
  
  
    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
  
    return { adminId: admin.id, accessToken };
  }
  

  // async signOut(refreshToken: string, res: Response) {
  //   let userData: any;
  //   try {
  //     userData = await this.jwtService.verify(refreshToken, {
  //       secret: process.env.REFRESH_TOKEN_KEY,
  //     });
  //   } catch (error) {
  //     throw new BadRequestException('Invalid refresh token');
  //   }
  
  //   if (!userData) {
  //     throw new ForbiddenException("User not found");
  //   }
  
  //   // ✨ null qilib yuborish
  //   await this.adminService.updateRefreshToken(userData.sub);
  
  //   res.clearCookie("refreshToken");
  
  //   return {
  //     message: "User logged out successfully",
  //   };
  // }
  

  // async refreshToken(adminId: string, refreshTokenFromCookie: string, res: Response) {
  //   const decodedToken: any = this.jwtService.decode(refreshTokenFromCookie);
  //   if (!decodedToken || decodedToken.id !== adminId) {
  //     throw new ForbiddenException("Ruxsat etilmagan");
  //   }

  //   const user = await this.adminService.findOne(adminId);
  //   if (!user || !user.hashed_refresh_token) {
  //     throw new NotAcceptableException("Foydalanuvchi topilmadi yoki refresh token mavjud emas");
  //   }

  //   const tokenMatch = await bcrypt.compare(
  //     refreshTokenFromCookie,
  //     user.hashed_refresh_token
  //   );
  //   if (!tokenMatch) {
  //     throw new ForbiddenException("Ruxsat etilmagan: token mos emas");
  //   }

  //   const { accessToken, refreshToken } = await this.generateTokens(user);
  //   const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

  //   await this.adminService.updateRefreshToken(user.id, hashedRefreshToken);

  //   res.cookie("refreshToken", refreshToken, {
  //     maxAge: +process.env.COOKIE_TIME!,
  //     httpOnly: true,
  //   });

  //   return {
  //     message: "Token successfully refreshed",
  //     userId: user.id,
  //     accessToken,
  //   };
  // }
}
