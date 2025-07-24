import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdvertisementDto {
  @Field()
  dermantin_id: number;
  @Field()
  discount_percent: number;
  @Field()
  type: string;
  @Field()
  status: string;
  @Field()
  start_date: string;
  @Field()
  end_date: string;
}
