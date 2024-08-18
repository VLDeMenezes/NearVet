import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilityServiceService } from './availabilityService.service';
import { CreateAvailabilityServiceDto } from './dto/create-availability-service.dto';
import { UpdateAvailabilityServiceDto } from './dto/update-availability-service.dto';

@Controller('availability-service')
export class AvailabilityServiceController {
  constructor(private readonly availabilityServiceService: AvailabilityServiceService) {}

  @Post()
  create(@Body() createAvailabilityServiceDto: CreateAvailabilityServiceDto) {
    return this.availabilityServiceService.create(createAvailabilityServiceDto);
  }

  @Get()
  findAll() {
    return this.availabilityServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilityServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailabilityServiceDto: UpdateAvailabilityServiceDto) {
    return this.availabilityServiceService.update(+id, updateAvailabilityServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilityServiceService.remove(+id);
  }
}
