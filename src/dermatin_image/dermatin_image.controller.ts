import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DermatinImageService } from './dermatin_image.service';
import { CreateDermatinImageDto } from './dto/create-dermatin_image.dto';
import { UpdateDermatinImageDto } from './dto/update-dermatin_image.dto';

@Controller('dermatin-image')
export class DermatinImageController {
  constructor(private readonly dermatinImageService: DermatinImageService) {}

  @Post()
  create(@Body() createDermatinImageDto: CreateDermatinImageDto) {
    return this.dermatinImageService.create(createDermatinImageDto);
  }

  @Get()
  findAll() {
    return this.dermatinImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermatinImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDermatinImageDto: UpdateDermatinImageDto) {
    return this.dermatinImageService.update(+id, updateDermatinImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dermatinImageService.remove(+id);
  }
}
