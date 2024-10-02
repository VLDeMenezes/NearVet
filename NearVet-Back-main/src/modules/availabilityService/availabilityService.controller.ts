import { Controller, Get, Post, Body } from '@nestjs/common';
import { AvailabilityServiceService } from './availabilityService.service';
import { GetAppointment } from './dto/getAppointment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Availabilities Services of Veterinarian")
@Controller('availability-service')
export class AvailabilityServiceController {
  constructor(private readonly availabilityServiceService: AvailabilityServiceService) {}

  @Post()
  @ApiOperation({summary: 'Retorna todos los Turnos libres de un servicio en particular'})
  async getAppointmentService(@Body() getApp: GetAppointment) {
    const {serviceId, date} = getApp
    return await this.availabilityServiceService.getAppointmentService(serviceId, date);
  }

  @Get()
  @ApiOperation({summary: 'Retorna todos los turnos disponibles a la fecha'})
  async getAvailability () {
    return await this.availabilityServiceService.getAvailability();
  }


}
