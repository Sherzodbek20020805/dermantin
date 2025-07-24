// category.resolver.ts

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  createCategory(@Args('createCategoryDto') createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Mutation(() => Boolean)
  removeCategory(@Args('id', { type: () => ID }) id: number) {
    return this.categoryService.remove(id).then(() => true);
  }
}
