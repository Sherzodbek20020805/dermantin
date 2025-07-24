import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DermatinService } from './dermatin.service';
import { Dermatin } from './entities/dermatin.entity';
import { CreateDermatinDto } from './dto/create-dermatin.dto';
import { UpdateDermatinDto } from './dto/update-dermatin.dto';

@Resolver(() => Dermatin)
export class DermatinResolver {
  constructor(private readonly dermatinService: DermatinService) {}

  @Mutation(() => Dermatin)
  createDermatin(
    @Args('CreateDermatinDto') createDermatinDto: CreateDermatinDto,
  ) {
    return this.dermatinService.create(createDermatinDto);
  }

  @Query(() => [Dermatin], { name: 'dermatins' })
  findAll() {
    return this.dermatinService.findAll();
  }

  @Query(() => Dermatin, { name: 'dermatin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dermatinService.findOne(id);
  }

  @Mutation(() => Dermatin)
  updateDermatin(
    @Args('UpdateDermatinDto') updateDermatinDto: UpdateDermatinDto,
  ) {
    return this.dermatinService.update(updateDermatinDto.id, updateDermatinDto);
  }

  @Mutation(() => Boolean)
  removeDermatin(@Args('id', { type: () => Int }) id: number) {
    return this.dermatinService.remove(id).then(() => true);
  }
}
