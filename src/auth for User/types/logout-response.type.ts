import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('LogoutResponseTypeUser')
export class LogoutResponseType {
  @Field()
  message: string;
}
