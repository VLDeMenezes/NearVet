import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExeptionVeterinarianService } from './exeption-veterinarian.service';
import { CreateExeptionVeterinarianDto } from './dto/create-exeption-veterinarian.dto';
import { UpdateExeptionVeterinarianDto } from './dto/update-exeption-veterinarian.dto';

@Controller('exeption-veterinarian')
export class ExeptionVeterinarianController {
  constructor(private readonly exeptionVeterinarianService: ExeptionVeterinarianService) {}

  @Post()
  create(@Body() createExeptionVeterinarianDto: CreateExeptionVeterinarianDto) {
    return this.exeptionVeterinarianService.create(createExeptionVeterinarianDto);
  }

  @Get()
  findAll() {
    return this.exeptionVeterinarianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exeptionVeterinarianService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExeptionVeterinarianDto: UpdateExeptionVeterinarianDto) {
    return this.exeptionVeterinarianService.update(+id, updateExeptionVeterinarianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exeptionVeterinarianService.remove(+id);
  }
}
