import { forwardRef, Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminResolver } from './admin.resolver';
import { UsersModule } from '../users/users.module';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]),
  forwardRef(() => UsersModule),],
  controllers: [AdminsController],
  providers: [AdminsService, AdminResolver],
  exports:[AdminsService]
})
export class AdminsModule {}
