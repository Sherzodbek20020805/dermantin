import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  full_name: string;
  @Field()
  phone: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  role: string;
  @Field()
  is_verifid: string;
  @Field()
  region: string;
  @Field()
  lang: string;
}
