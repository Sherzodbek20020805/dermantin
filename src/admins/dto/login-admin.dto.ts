import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginAdminDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
