import { Module } from '@nestjs/common';
import { DermatinImageService } from './dermatin_image.service';
import { DermatinImageController } from './dermatin_image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DermatinImage } from './entities/dermatin_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DermatinImage])],
  controllers: [DermatinImageController],
  providers: [DermatinImageService],
  exports: [DermatinImageService],
})
export class DermatinImageModule {}
