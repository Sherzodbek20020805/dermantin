import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field()
  full_name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}
