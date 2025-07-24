import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class DermatinImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dermation_id: number;

  @Field()
  @Column('text')
  image_url: string;

  @Field()
  @Column()
  is_main: boolean;

}
