import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Store {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  manager_id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  logo_url: string;

  @Field()
  @Column()
  region: string;

  @Field()
  @Column()
  destcription: string;

  @Field()
  @Column()
  raiting_id: number;
  
  @Field()
  @Column()
  status: string;
}
