import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepo: Repository<Advertisement>,
  ) {}

    async create(createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
      const Advertisement = this.advertisementRepo.create(createAdvertisementDto);
      return this.advertisementRepo.save(Advertisement);
    }
  
    async findAll(): Promise<Advertisement[]> {
      return this.advertisementRepo.find();
    }
  
    async findOne(id: number): Promise<Advertisement> {
      const Advertisement = await this.advertisementRepo.findOneBy({ id });
      if (!Advertisement) {
        throw new Error('Advertisement not found');
      }
      return Advertisement;
    }
  
    async update(
      id: number,
      updateAdvertisementDto: UpdateAdvertisementDto,
    ): Promise<Advertisement> {
      await this.advertisementRepo.update(id, updateAdvertisementDto);
      return this.findOne(id);
    }
  
    async remove(id: number): Promise<void> {
      await this.advertisementRepo.delete(id);
    }
}
