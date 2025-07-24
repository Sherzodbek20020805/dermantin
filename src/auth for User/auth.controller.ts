import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthServiceUser } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserInput } from '../user/dto/login-user.input';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServiceUser: AuthServiceUser) {}

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authServiceUser.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authServiceUser.login(loginUserDto);
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

    const UserId = payload.id;
    await this.authServiceUser.logout(UserId);

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
    const UserId = payload.id;

    const tokens = await this.authServiceUser.refresh(UserId, refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }
}
