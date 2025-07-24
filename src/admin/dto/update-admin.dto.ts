import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAdminDto {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  full_name?: string;

  @Field({ nullable: true })
  email?: string;
}
