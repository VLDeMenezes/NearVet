import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode, Query } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';

@ApiTags('Prescriptions')
@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Get()
  @ApiOperation({summary: "Obtiene todas las prescripciones"})
  getAllPrescriptions() {
    return this.prescriptionService.getAllPrescriptions();
  }

  @Get('pet/:petId')
  @ApiOperation({ summary: 'Obtiene todas las prescripciones por mascota especifica'})
  async getAllPrescriptionsByPet(@Param('petId') petId: string) {
    return await this.prescriptionService.getAllPrescriptionsByPet(petId);
  }

  @Get('clinical-examination/:clinicalExaminationId')
  async getAllPrescriptionsByClinicalExamination( @Param('clinicalExaminationId') clinicalExaminationId: string) {
    return await this.prescriptionService.getAllPrescriptionsByClinicalExamination(clinicalExaminationId);
  }

  @Get(':id')
  @ApiOperation({summary: "Obtiene una prescripción por ID"})
  getPrescriptionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionService.getPrescriptionById(id);
  }

  @Post()
  @ApiOperation({summary: "Crea una nueva prescripción"})
  createPrescription(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.createPrescription(createPrescriptionDto);
  }

  @Put(':id')
  @ApiOperation({summary: "Actualiza una prescripción por ID"})
  updatePrescription(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.updatePrescription(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Elimina una prescripción por ID"})
  deletePrescription(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionService.deletePrescription(id);
  }
}
