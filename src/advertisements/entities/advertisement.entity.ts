import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@ObjectType()
@Entity('advertisements')
export class Advertisement {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dermantin_id: number;

  @Field()
  @Column()
  discount_percent: number;

  @Field()
  @Column() 
  type: string;

  @Field()
  @Column() 
  status: string;

  @Field()
  @Column()
  start_date: string;

  @Field()
  @Column()
  end_date: string;

}
