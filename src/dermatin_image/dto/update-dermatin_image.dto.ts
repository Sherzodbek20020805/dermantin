import { PartialType } from '@nestjs/mapped-types';
import { CreateDermatinImageDto } from './create-dermatin_image.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDermatinImageDto extends PartialType(
  CreateDermatinImageDto,
) {
  @Field(() => Int)
  id: number;
}
