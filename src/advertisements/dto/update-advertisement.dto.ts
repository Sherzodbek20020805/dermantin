import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvertisementDto } from './create-advertisement.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAdvertisementDto extends PartialType(
  CreateAdvertisementDto,
) {
  @Field(() => Int)
  id: number;
}
