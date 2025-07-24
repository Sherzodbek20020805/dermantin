import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDermatinImageDto {
  @Field()
  dermation_id: number;
  @Field()
  image_url: string;
  @Field()
  is_main: boolean;
}
