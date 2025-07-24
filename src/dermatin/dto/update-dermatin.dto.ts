import { PartialType } from '@nestjs/mapped-types';
import { CreateDermatinDto } from './create-dermatin.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDermatinDto extends PartialType(CreateDermatinDto) {
  @Field(() => Int)
  id: number;
}
