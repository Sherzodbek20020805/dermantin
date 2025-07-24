import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
export class Admin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;
  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;
  @Field()
  @Column()
  password: string;
  @Field()
  @Column({ default: false })
  is_active: boolean;
  @Field()
  @Column({ default: false })
  is_creator: boolean;

  // @Field({ nullable: true })
  @Column({ nullable: true })
  hashed_refresh_token?: string;
}
