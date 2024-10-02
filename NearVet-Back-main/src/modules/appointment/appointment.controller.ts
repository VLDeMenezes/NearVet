import { Controller, Post, Body, Param, Put, Get, Query, HttpCode, HttpStatus, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppResponseCalendarDayDto } from './dto/AppResponseCalendar.dto';
import { Appointment } from './entities/appointment.entity';
import { IdAndDateDto} from './dto/idAndDate.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  @ApiOperation({ summary: 'Muestra todos los turnos' })
  getAppoinment(@Query('page') page: number, 
                @Query('limit') limit: number ) {
        return this.appointmentService.getAppointmentsService(+page, +limit);
  }

  @Get('/user/:userId')
  @ApiOperation({summary: 'Muestra turnos creados por el usuario'})
  getAppoinmentsByUserId(@Param('userId', ParseUUIDPipe) userId: string, 
                         @Query('page') page: number,  
                         @Query('limit') limit: number ) {
    return this.appointmentService.getAppointmentsByUserIdService(userId, +page, +limit);
  }

  @Get('/pet/:petId')
  @ApiOperation({summary: 'Muestra turnos creados por el usuario'})
  getAppoinmentsByPetId(@Param('petId', ParseUUIDPipe) petId: string, 
                         @Query('page') page: number,  
                         @Query('limit') limit: number ) {
    return this.appointmentService.getAppointmentsByPetIdService(petId, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({summary: 'Muestra un turno por ID'})
  getAppoinmentById(@Param('id', ParseUUIDPipe) id: string): Promise<Appointment> {
    return this.appointmentService.getAppointmentByIdService(id);
  }

  @Post("AppointmentsByVeterinarianAndDate")
  async getAppointmentsByVeterinarianAndDate (@Body() vetDate:IdAndDateDto): Promise<AppResponseCalendarDayDto[]> {
         return await this.appointmentService.getAppointmentsByIdAndDate(vetDate.id, false, vetDate.startDate, vetDate.endDate)
  }

  @Post("AppointmentsByAdminAndDate")
  async getAppointmentsByAdminAndDate (@Body() adminDate:IdAndDateDto): Promise<AppResponseCalendarDayDto[]> {
         return await this.appointmentService.getAppointmentsByIdAndDate(adminDate.id, true, adminDate.startDate, adminDate.endDate)
  }

  @Post()
  @ApiOperation({summary: 'Crear turno'})
  @ApiBody({
    description: 'Ingrese los datos requeridos para el turno',
    type: CreateAppointmentDto,
  })
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointmentService(createAppointmentDto);
  }

  @Put('edit/:idAppointment')
  @ApiOperation({summary: 'Edita turno'})
  @ApiBody({
    description: 'Ingrese los datos para editar el turno',
    type: EditAppointmentDto,
  })
  editAppointment(@Param('idAppointment', ParseUUIDPipe) idAppointment: string, @Body() editAppointmentDto: EditAppointmentDto) {
    return this.appointmentService.editAppointmentService(idAppointment, editAppointmentDto);
  }

  @Put('finish/:idAppointment')
  @ApiOperation({summary: 'Finaliza turno'})
  finishAppointment(@Param('idAppointment', ParseUUIDPipe) idAppointment: string) {
    return this.appointmentService.finishAppointmentService(idAppointment);
  }

  @Put('cancel/:idAppointment')
  @ApiOperation({summary: 'Cancela turno'})
  cancelAppointment(@Param('idAppointment', ParseUUIDPipe) idAppointment: string) {
    return this.appointmentService.cancelAppointmentService(idAppointment);
  }
}
