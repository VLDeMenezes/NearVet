import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { VetsService } from './vets.service';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Vets')
@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene el listado de todas las veterinarias',
    description: 'Obtiene el listado de todas las veterinarias'
  })
  getAllVeterinary() {
    return this.vetsService.getAllVeterinaryService();
  }

  @Get('logo')
  @ApiOperation({summary: 'Obtiene la URL del logo de la empresa'})
  getVeterinaryLogo() {
    return this.vetsService.getVeterinaryLogo();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtiene una veterinaria por su ID'})
  getVeterinaryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.vetsService.getVeterinaryByIdService(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crea una nueva veterinaria',
    description: 'Crea una nueva veterinaria con los datos proporcionados',
  })
  createVeterinary(@Body() createVetDto: CreateVetDto) {
    return this.vetsService.createVeterinaryService(createVetDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza una veterinaria existente',
    description: 'Actualiza una veterinaria existente con los datos proporcionados por ID',
  })
  updateVeterinary(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateVetDto: UpdateVetDto
  ) {
    return this.vetsService.updateVeterinaryService(id, updateVetDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una veterinaria existente',
    description: 'Elimina una veterinaria específica por su ID',
  })
  removeVeterinary(@Param('id', ParseUUIDPipe) id: string) {
    return this.vetsService.removeVeterinaryService(id);
  }
}
