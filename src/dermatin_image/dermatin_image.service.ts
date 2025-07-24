import { Injectable } from '@nestjs/common';
import { CreateDermatinImageDto } from './dto/create-dermatin_image.dto';
import { UpdateDermatinImageDto } from './dto/update-dermatin_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DermatinImage } from './entities/dermatin_image.entity';

@Injectable()
export class DermatinImageService {
  constructor(
    @InjectRepository(DermatinImage)
    private readonly dermatinImageRepo: Repository<DermatinImage>,
  ) {}

  async create(createDermatinImageDto: CreateDermatinImageDto): Promise<DermatinImage> {
    const Dermatin = this.dermatinImageRepo.create(createDermatinImageDto);
    return this.dermatinImageRepo.save(Dermatin);
  }

  async findAll(): Promise<DermatinImage[]> {
    return this.dermatinImageRepo.find();
  }

  async findOne(id: number): Promise<DermatinImage> {
    const Dermatin = await this.dermatinImageRepo.findOneBy({ id });
    if (!Dermatin) {
      throw new Error('Dermatin not found');
    }
    return Dermatin;
  }

  async update(
    id: number,
    updateDermatinDto: UpdateDermatinImageDto,
  ): Promise<DermatinImage> {
    await this.dermatinImageRepo.update(id, updateDermatinDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.dermatinImageRepo.delete(id);
  }
}
