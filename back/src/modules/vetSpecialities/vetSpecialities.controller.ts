import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VetSpecialitiesService } from './vetSpecialities.service';
import { CreateVetEspecialityDto } from './dto/create-vet-especiality.dto';
import { UpdateVetEspecialityDto } from './dto/update-vet-especiality.dto';

@Controller('vet-especialities')
export class VetSpecialitiesController {
  constructor(private readonly vetEspecialitiesService: VetSpecialitiesService) {}

  @Post()
  create(@Body() createVetEspecialityDto: CreateVetEspecialityDto) {
    return this.vetEspecialitiesService.create(createVetEspecialityDto);
  }

  @Get()
  findAll() {
    return this.vetEspecialitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vetEspecialitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVetEspecialityDto: UpdateVetEspecialityDto) {
    return this.vetEspecialitiesService.update(+id, updateVetEspecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vetEspecialitiesService.remove(+id);
  }
}
