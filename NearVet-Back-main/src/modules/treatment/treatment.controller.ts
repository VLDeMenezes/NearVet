import { Controller, Get, Post, Body, Param, Delete, HttpCode, Query, Put } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/createTreatment.dto';
import { UpdateTreatmentDto } from './dto/updateTreatment.dto';
import { Treatment } from './entities/treatment.entity';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Treatments")
@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Get()
  @ApiOperation({summary: "Devuelve todos los Tratamientos"})
  async getTreatments (
  ): Promise<Treatment[]>  {
    return await this.treatmentService.getTreatments();
  }

  @Get("service/:serviceId")
  @ApiOperation({summary: "Devuelve los tratamientos relacionados con el servicio"})
  async getTreatmentsByService(
    @Param('serviceId') serviceId: string
  ): Promise<Treatment[]> {
    return await this.treatmentService.getTreatmentsByService(serviceId);
  }

  // @Get("typeService/:typeServiceId")
  // @ApiOperation({summary: "Devuelve los tratamientos relacionados con el servicio",
  //               description: "Esta ruta devulve un array con los tratamiento pasado por ID"})
  // @HttpCode(200)
  // @ApiParam({name:"typeServiceId", required:true, description: "Ingrese el Id del Tipo de Servicio (uuid)"})
  // @ApiNotFoundResponse({description: "No se encontraron tratamientos en el servicio especificado"})
  // async getTreatmentsByTypeService (@Param("typeServiceId") typeServiceId: string): Promise<Treatment[]>  {
  //   return await this.treatmentService.getTreatmentsByTypeService(typeServiceId)
  // }

  // @Get("dates/")
  // @ApiOperation({summary: "Devuelve los tratamientos en el priodo especificado",
  //               description: "Esta ruta devulve un array con los tratamiento existentes en el periodo especificado"})
  // @HttpCode(200)
  // @ApiNotFoundResponse({description: "No se encontraron tratamientos en el periodo especificado"})
  // @ApiQuery({ name: 'startDate', required: true })
  // @ApiQuery({ name: 'endDate', required: true })
  // async getTreatmentsByDates (@Query("startDate") startDate: Date = new Date(), @Query("endDate") endDate: Date = new Date()): Promise<Treatment[]>  {
  //   return await this.treatmentService.getTreatmentsByDates(startDate, endDate);
  // }

  @Get("pet/:petId")
  @ApiOperation({summary: "Devuelve los tratamientos relacionados con la mascota"})
  async getTreatmentsByPet(
    @Param('petId') petId: string
  ): Promise<Treatment[]> {
    return await this.treatmentService.getTreatmentsByPet(petId);
  }

  @Get(":id")
  @ApiOperation({summary: "Devuelve un tratamiento por ID"})
  async getTreatmentById (@Param("id") id:string): Promise<Treatment>  {
    return await this.treatmentService.getTreatmentById(id);
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo tratamiento"})
  async createTreatment (@Body() treatment: CreateTreatmentDto): Promise<Treatment> {
    return await this.treatmentService.createTreatment(treatment)
  }

  @Put("id")
  @ApiOperation({summary: "Actualiza los datos de un tratamiento"})
  async updateTreatment (@Param("id") id: string , @Body() treatment: UpdateTreatmentDto): Promise<string> {
    return await this.treatmentService.updateTreatment(id, treatment)
  } 

  @Delete("id")
  @ApiOperation({summary: "Elimina un tratamiento"})
  async removeTreatment (@Param("id") id: string): Promise<string> {
    return await this.treatmentService.removeTreatment(id)
  } 
}
