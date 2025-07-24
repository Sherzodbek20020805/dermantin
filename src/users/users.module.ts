import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]), AdminsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports:[UsersService]
})
export class UsersModule {}
