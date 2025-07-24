import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Dermatin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  store_id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  prise: number;

  @Field()
  @Column()
  raiting: number;

  @Field()
  @Column()
  class: string;

  @Field()
  @Column()
  category_id: number;
}
