import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminInput } from '../admin/dto/create-admin.dto';
import { LoginAdminInput } from '../admin/dto/login-admin.input';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() createAdminDto: CreateAdminInput) {
    return this.authService.register(createAdminDto);
  }

  @Post('login')
  async login(
    @Body() loginAdminDto: LoginAdminInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(loginAdminDto);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token mavjud emas');
    }

    const jwt = require('jsonwebtoken');
    const payload: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
    );

    const adminId = payload.id;
    await this.authService.logout(adminId);

    res.clearCookie('refreshToken');

    return { message: 'Logged out successfully' };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token mavjud emas');
    }

    const jwt = require('jsonwebtoken');
    const payload: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
    );
    const adminId = payload.id;

    const tokens = await this.authService.refresh(adminId, refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }
}
