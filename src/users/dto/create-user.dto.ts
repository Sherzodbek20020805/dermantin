import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserDto {
  @Field()
  full_name: string;

  @Field()
  phone: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  region: string;

  @Field()
  lang: string;

  
}
