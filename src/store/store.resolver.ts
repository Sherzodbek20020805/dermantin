import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(() => Store)
  createStore(@Args('createStoreInput') createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Query(() => [Store], { name: 'stores' })
  findAll() {
    return this.storeService.findAll();
  }

  @Query(() => Store, { name: 'store' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storeService.findOne(id);
  }

  @Mutation(() => Store)
  updateStore(@Args('updateStoreInput') updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(updateStoreDto.id, updateStoreDto);
  }

  @Mutation(() => Boolean)
  removeStore(@Args('id', { type: () => Int }) id: number) {
    return this.storeService.remove(id).then(() => true);
  }
}
