import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello GraphQL!';
  }
}
