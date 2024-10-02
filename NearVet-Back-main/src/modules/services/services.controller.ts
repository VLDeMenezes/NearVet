import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Service } from './entities/service.entity';

@ApiTags("Services")
@Controller('services')
export class ServicesController {

  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({summary: 'Retorna todos los datos de todas los servicios'})
  async getServices(): Promise<Service[]> {
    return await this.servicesService.getServices();
  }

  @Get('category/:cat')
  @ApiOperation({summary: 'Retorna un array con todos los datos de los servicios contenidos por la categoria'})
  async getServiceByCategory(@Param('cat') categoriaId: string): Promise<Service[]> {
    return await this.servicesService.getServiceByCategory(categoriaId);
  }

  @Get('veterinarian/:vet')
  @ApiOperation({summary: 'Retorna todos los datos de los servicio asociados al veterinario pasado por ID'})
  async getServiceByVeterinarian(@Param('vet') veterinarianId: string): Promise<Service[]> {
    return await this.servicesService.getServiceByVeterinairan(veterinarianId);
  }

  @Get(':id')
  @ApiOperation({summary: 'Retorna todos los datos del servicio requerido por ID'})
  async getServiceById(@Param('id', ParseUUIDPipe) id: string): Promise<Service> {
    return await this.servicesService.getServiceById(id);
  }
  
  @Post()
  @ApiOperation({summary: 'Registra un servicio nuevo'})
  @ApiBody({ description: 'Ingesar los datos del servicio', type: CreateServiceDto })
  async createService(@Body() createCategoryService: CreateServiceDto):Promise<Service> {
    return await this.servicesService.createService(createCategoryService);
  }

  @Put(':id')
  @ApiOperation({summary: 'Actualiza Datos del serivcio especificado'})
  updateService(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryService: UpdateServiceDto): Promise<string> {
    return this.servicesService.updateService(id, updateCategoryService);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Elimina un serivcio pasado por ID'})
  async removeService(@Param('id', ParseUUIDPipe) id: string) {
    return await this.servicesService.removeService(id);
  }
}
