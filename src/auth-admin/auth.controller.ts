import { BadRequestException, Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { Request, Response } from "express";
import { CreateAdminInput } from "../admins/dto/create-admin.dto";
import { LoginAdminDto } from "../admins/dto/login-admin.dto";


@Controller("admin/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signUp")
  async registration(@Body() createAdminDto: CreateAdminInput) {
    return this.authService.registration(createAdminDto);
  }

  @Post("signIn")
  async login(
    @Body() loginAdminDto: LoginAdminDto,
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
