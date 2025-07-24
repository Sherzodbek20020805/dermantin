import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @Field(() => Int)
  id: number;
}
