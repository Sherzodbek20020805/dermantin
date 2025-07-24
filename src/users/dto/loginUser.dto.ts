import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserDto {
  @Field()
  phone: string;
}
