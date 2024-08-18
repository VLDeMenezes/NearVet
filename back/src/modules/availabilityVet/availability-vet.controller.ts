import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilityVetService } from './availability-vet.service';
import { CreateAvailabilityVetDto } from './dto/create-availability-vet.dto';
import { UpdateAvailabilityVetDto } from './dto/update-availability-vet.dto';

@Controller('availability-vet')
export class AvailabilityVetController {
  constructor(private readonly availabilityVetService: AvailabilityVetService) {}

  @Post()
  create(@Body() createAvailabilityVetDto: CreateAvailabilityVetDto) {
    return this.availabilityVetService.create(createAvailabilityVetDto);
  }

  @Get()
  findAll() {
    return this.availabilityVetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilityVetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailabilityVetDto: UpdateAvailabilityVetDto) {
    return this.availabilityVetService.update(+id, updateAvailabilityVetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilityVetService.remove(+id);
  }
}
