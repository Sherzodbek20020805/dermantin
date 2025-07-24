import { Module } from '@nestjs/common';
import { DermatinService } from './dermatin.service';
import { DermatinController } from './dermatin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dermatin } from './entities/dermatin.entity';
import { DermatinResolver } from './dermatin.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Dermatin])],
  controllers: [DermatinController],
  providers: [DermatinService, DermatinResolver],
  exports: [DermatinService],
})
export class DermatinModule {}
