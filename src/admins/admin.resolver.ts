import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Resolver('admins')
export class AdminResolver {
  constructor(private readonly adminService: AdminsService) {}

  @Query(() => [Admin])
  findAllAdmins() {
    return this.adminService.findAll();
  }
  @Query(() => Admin)
  findOneAdmin(@Args('id', {type: ()=> ID}) id: number) {
    return this.adminService.findOne(+id);
  }

  @Mutation(() => Admin)
  createAdmin(@Args('createAdmin') createAdmin: CreateAdminInput) {
    return this.adminService.create(createAdmin);
  }
  


  @Mutation(()=> Admin)
  updateAdmin(@Args('id', {type: ()=> ID}) id: number, @Args("updateAdmin") updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Mutation(()=> Number)
  removeAdmin(@Args('id', {type: ()=> ID}) id: number) {
    return this.adminService.remove(+id);
  }
}
