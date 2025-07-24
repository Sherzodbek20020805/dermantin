import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}
  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  const user = await this.userRepo.preload({id, ...updateUserDto});
  if(!user){
    throw new NotFoundException(`${id} lik user yoq`);
  }
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return id;
  }

  async findByPhone(phone: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { phone } });
  }
  private normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '').replace(/^998/, '+998');
  }
  
  
  // async updateRefreshToken(id: number, hashedToken: string | null) {
  //   return await this.userRepo.update(id, {
  //     hashed_refresh_token: hashedToken,
  //   });
  // }
  
}
