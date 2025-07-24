import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminInput } from './dto/create-admin.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}
  async create(dto: CreateAdminInput): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(dto.password, 7);
    const admin = this.adminRepo.create({
      ...dto,
      password: hashedPassword,
    });
    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.adminRepo.preload({ id, ...updateAdminDto });
    if (!user) {
      throw new NotFoundException(`${id} lik user yoq`);
    }
    return this.adminRepo.save(user);
  }

  async remove(id: number) {
    await this.adminRepo.delete(id);
    return id;
  }
  
  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminRepo.findOne({ where: { email } });
  }

  // async updateRefreshToken(id: string, hashedToken: string | null) {
  //   await this.adminRepo.update(id, {
  //     password: hashedToken,
  //   });

  async updateRefreshToken(id: number, hashedToken: string) {
    return await this.adminRepo.update(id, {
      hashed_refresh_token: hashedToken,
    });
  }
  
}
