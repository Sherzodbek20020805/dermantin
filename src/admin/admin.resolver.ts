import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Query(() => [Admin], { name: 'getAllAdmins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'getAdmin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAdminInput') updateAdminInput: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminInput);
  }

  @Mutation(() => Boolean)
  async removeAdmin(@Args('id', { type: () => Int }) id: number) {
    await this.adminService.remove(id);
    return true;
  }
}
