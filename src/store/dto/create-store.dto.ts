import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoreDto {
  @Field()
  manager_id: number;
  @Field()
  name: string;
  @Field()
  logo_url: string;
  @Field()
  region: string;
  @Field()
  destcription: string;
  @Field()
  raiting_id: number;
  @Field()
  status: string;
}
