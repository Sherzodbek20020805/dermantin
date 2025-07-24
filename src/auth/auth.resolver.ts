import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAdminInput } from '../admin/dto/create-admin.dto';
import { LoginAdminInput } from '../admin/dto/login-admin.input';
import { TokensType } from './types/tokens.type';
import { LogoutResponseType } from './types/logout-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('input') input: CreateAdminInput): Promise<string> {
    const admin = await this.authService.register(input);
    return `Admin created with id ${admin.id}`;
  }

  @Mutation(() => TokensType)
  async login(@Args('input') input: LoginAdminInput): Promise<TokensType> {
    return await this.authService.login(input);
  }

  @Mutation(() => LogoutResponseType)
  async logout(
    @Args('adminId', { type: () => Int }) adminId: number,
  ): Promise<LogoutResponseType> {
    return await this.authService.logout(adminId);
  }

  @Mutation(() => TokensType)
  async refreshToken(
    @Args('adminId', { type: () => Int }) adminId: number,
    @Args('refreshToken') refreshToken: string,
  ): Promise<TokensType> {
    return await this.authService.refresh(adminId, refreshToken);
  }
}
