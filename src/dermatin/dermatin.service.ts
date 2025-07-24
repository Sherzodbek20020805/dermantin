import { Injectable } from '@nestjs/common';
import { CreateDermatinDto } from './dto/create-dermatin.dto';
import { UpdateDermatinDto } from './dto/update-dermatin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermatin } from './entities/dermatin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DermatinService {
  constructor(
    @InjectRepository(Dermatin)
    private readonly dermatinRepo: Repository<Dermatin>,
  ) {}

  async create(createDermatinDto: CreateDermatinDto): Promise<Dermatin> {
    const Dermatin = this.dermatinRepo.create(createDermatinDto);
    return this.dermatinRepo.save(Dermatin);
  }

  async findAll(): Promise<Dermatin[]> {
    return this.dermatinRepo.find();
  }

  async findOne(id: number): Promise<Dermatin> {
    const Dermatin = await this.dermatinRepo.findOneBy({ id });
    if (!Dermatin) {
      throw new Error('Dermatin not found');
    }
    return Dermatin;
  }

  async update(
    id: number,
    updateDermatinDto: UpdateDermatinDto,
  ): Promise<Dermatin> {
    await this.dermatinRepo.update(id, updateDermatinDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.dermatinRepo.delete(id);
  }
}
