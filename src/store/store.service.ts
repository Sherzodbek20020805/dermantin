import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
        @InjectRepository(Store)
        private readonly storeRepo: Repository<Store>,
      ) {}
  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const Store = this.storeRepo.create(createStoreDto);
    return this.storeRepo.save(Store);
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepo.find();
  }

  async findOne(id: number): Promise<Store> {
    const Store = await this.storeRepo.findOneBy({ id });
    if (!Store) {
      throw new Error('Store not found');
    }
    return Store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    await this.storeRepo.update(id, updateStoreDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.storeRepo.delete(id);
  }
}
