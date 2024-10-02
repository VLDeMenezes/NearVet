import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { VeterinarianService } from './veterinarian.service';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { Veterinarian } from './entities/veterinarian.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Veterinarian")
@Controller('veterinarian')
export class VeterinarianController {
  constructor(private readonly veterinarianService: VeterinarianService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna todos los datos de todos los veterinarios'})
  async getVeteriarian(): Promise<Veterinarian[]> {
    return await this.veterinarianService.getVeteriarian();
  }

  @Get('licence/:lic')
  @ApiOperation({summary: 'Retorna todos los datos del veterinario requerido por Licencia'})
  async getVeterinarianByLicence(@Param('lic', ParseIntPipe) lic: number): Promise<Veterinarian> {
    return await this.veterinarianService.getVeterinarianByLicence(+lic);
  }

  @Get(':id')
  @ApiOperation({summary: 'Retorna todos los datos del veterinario requerido por ID'})
  async getVeterinarianById(@Param('id', ParseUUIDPipe) id: string): Promise<Veterinarian> {
    return await this.veterinarianService.getVeterinarianById(id);
  }
  
  @Post()
  @ApiOperation({summary: 'Registra datos especificos de un Veterinario'})
  @ApiBody({ description: 'Ingesar los datos particulares del veterinario', type: CreateVeterinarianDto })
  create(@Body() createVeterinarian: CreateVeterinarianDto):Promise<Veterinarian> {
    return this.veterinarianService.create(createVeterinarian);
  }

  @Put(':id')
  @ApiOperation({summary: 'Actualiza Datos de un Veterinario especifico'})
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVeterinarian: UpdateVeterinarianDto,): Promise<string> {
    return this.veterinarianService.update(id, updateVeterinarian);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Elimina un veterinario pasado por ID'})
  remove(@Param('id') id: string) {
    return this.veterinarianService.remove(id);
  }
 
}
