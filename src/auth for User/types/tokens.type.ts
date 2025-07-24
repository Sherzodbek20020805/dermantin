import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('TokensTypeUser')
export class TokensType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
