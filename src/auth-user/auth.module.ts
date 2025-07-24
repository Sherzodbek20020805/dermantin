import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { UsersAuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [UsersAuthService],
  exports: [UsersAuthService],
})
export class AuthUserModule {}
