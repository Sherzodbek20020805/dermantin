import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  full_name: string;

  @Field(() => String)
  @Column()
  phone: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column({ nullable: true })
  hashed_password: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  hashed_refresh_token: string | null;

  @Field(() => String)
  @Column({ nullable: true })
  role: string;

  @Field(() => String)
  @Column({ nullable: true })
  is_verifid: string;

  @Field(() => String)
  @Column({ nullable: true })
  region: string;

  @Field(() => String)
  @Column({ nullable: true })
  lang: string;
}
