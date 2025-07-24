import { BadRequestException, Body, Controller, Post, Req, Res } from "@nestjs/common";

import { Request, Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersAuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/loginUser.dto";


@Controller("user/auth")
export class AuthController {
  constructor(private readonly authService: UsersAuthService) {}

  @Post("signUp")
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("signIn")
  async login(
    @Body() loginAdminDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(loginAdminDto, res);
  }

  // @Post("logout")
  // async logout(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response
  // ) {
  //   const refreshToken = req.cookies?.refreshToken;
  //   if (!refreshToken) {
  //     throw new BadRequestException("Refresh token mavjud emas");
  //   }
  //   return this.authService.signOut(refreshToken, res);
  // }
  

//   @Post("refresh")
// async refresh(
//   @Body("adminId") adminId: string,
//   @Req() req: Request,
//   @Res({ passthrough: true }) res: Response
// ) {
//   const refreshToken = req.cookies?.refreshToken;
//   return this.authService.refreshToken(adminId, refreshToken, res);
// }
}
