import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDermatinDto {
  @Field()
  store_id: number;
  @Field()
  name: string;
  @Field()
  prise: number;
  @Field()
  raiting: number;
  @Field()
  class: string;
  @Field()
  category_id: number;
}
