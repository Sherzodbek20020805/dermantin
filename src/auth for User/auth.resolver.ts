import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthServiceUser } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserInput } from '../user/dto/login-user.input';
import { TokensType } from './types/tokens.type';
import { LogoutResponseType } from './types/logout-response.type';
import { User } from '../user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthServiceUser) {}

  @Mutation(() => String)
  async register(@Args('input') input: CreateUserDto): Promise<string> {
    const User = await this.authService.register(input);
    return `User created with id ${User.id}`;
  }

  @Mutation(() => TokensType)
  async login(@Args('input') input: LoginUserInput): Promise<TokensType> {
    return await this.authService.login(input);
  }

  @Mutation(() => LogoutResponseType)
  async logout(
    @Args('UserId', { type: () => Int }) UserId: number,
  ): Promise<LogoutResponseType> {
    return await this.authService.logout(UserId);
  }

  @Mutation(() => TokensType)
  async refreshToken(
    @Args('UserId', { type: () => Int }) UserId: number,
    @Args('refreshToken') refreshToken: string,
  ): Promise<TokensType> {
    return await this.authService.refresh(UserId, refreshToken);
  }
}
