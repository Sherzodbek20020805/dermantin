import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponseType {
  @Field()
  message: string;
}
