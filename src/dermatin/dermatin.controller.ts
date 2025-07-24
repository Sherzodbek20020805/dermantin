import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DermatinService } from './dermatin.service';
import { CreateDermatinDto } from './dto/create-dermatin.dto';
import { UpdateDermatinDto } from './dto/update-dermatin.dto';

@Controller('dermatin')
export class DermatinController {
  constructor(private readonly dermatinService: DermatinService) {}

  @Post()
  create(@Body() createDermatinDto: CreateDermatinDto) {
    return this.dermatinService.create(createDermatinDto);
  }

  @Get()
  findAll() {
    return this.dermatinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermatinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDermatinDto: UpdateDermatinDto) {
    return this.dermatinService.update(+id, updateDermatinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dermatinService.remove(+id);
  }
}
