import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { Appointment } from './entities/appointment.entity';
import { AppResponseCalendarDayDto } from './dto/AppResponseCalendar.dto';
import { EmailService } from '../email/email.service';
import { StatesAppointment } from './entities/statesAppointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly emailService: EmailService,
  ) {}

  async getAppointmentsService(page: number, limit: number): Promise<Appointment[]> {
    return await this.appointmentRepository.getAppointments(page, limit);
  }

  async getAppointmentByIdService(idAppointment: string): Promise<Appointment> {
    const appointment: Appointment = await this.appointmentRepository.getAppointmentById(idAppointment)
    if (!appointment) throw new NotFoundException('Turno no encontrado');
    return appointment;
  }

  async getAppointmentsByUserIdService(userId: string, page: number, limit : number) {
    return await this.appointmentRepository.getAppointmentsByUserId(userId, page, limit);
  }

  async getAppointmentsByPetIdService(petId: string, page: number, limit : number) {
    return await this.appointmentRepository.getAppointmentsByUserId(petId, page, limit);
  }

   async getAppointmentsByIdAndDate (id:string, admin: Boolean, startDate: Date, endDate:Date): Promise<AppResponseCalendarDayDto[]> {
     const appointments: Appointment[] =
      admin ? await this.appointmentRepository.getAppointmentsByAdminAndDate(startDate, endDate) : await this.appointmentRepository.getAppointmentsByVeterinarianAndDate(id, startDate, endDate);
     const responseAppointments: AppResponseCalendarDayDto[] = []
     if (appointments.length>0) {
       appointments.forEach ((appointment) => {
             let endHour: number = +(appointment.time.split(":")[0]);
             let endMin: number = +(appointment.time.split(":")[1]);
             const delayApp: number = appointment.service.durationMin;
             endMin += delayApp;
             if (endMin >= 60) {
               endHour += 1;
               endMin -= 60
             }
             const dateApp = new Date(appointment.date)
             const responseAppointment: AppResponseCalendarDayDto = {
               id: appointment.id,
               Subject: `${appointment.service.service} - ${appointment.pet.user.name} ${appointment.pet.user.lastName}`, //"Rayos X - Javier", servicio - nombre del cliente
               description: appointment.messageUser ? `Mascota: ${appointment.pet.name} - Observación: ${appointment.messageUser}` : `Mascota: ${appointment.pet.name} - Observación: Sin Observacíones`, //"Mascota: Firu - Observaciones: Sin observaciones", Pet - Observacion del Cliente
               StartTime: new Date(dateApp.getFullYear(), dateApp.getMonth(), dateApp.getDate(), +appointment.time.split(":")[0], +appointment.time.split(":")[1]), // new Date(2024, 8, 9, 9, 0), ///anio, -mes, dia, hora, minutos Horario de comienzo
               EndTime: new Date(dateApp.getFullYear(), dateApp.getMonth(), dateApp.getDate(), endHour, endMin), //new Date(2024, 8, 9, 10, 0), Horario fin
               isAllDay: false, //false, siempre en false
               petId: appointment.pet.id,
               stateAppointment: appointment.state.state,
             }
             responseAppointments.push(responseAppointment);
       })  
     } 
     return responseAppointments;
   }

  async createAppointmentService(createAppointment: Partial<Appointment>) {
    const newAppointment = await this.appointmentRepository.createAppointment(createAppointment);
    if (!newAppointment) throw new InternalServerErrorException("No se pudo crear el turno")
    await this.emailService.appointmentNotification(newAppointment.id)
    return newAppointment;
  }

  async editAppointmentService(id: string, editAppointment: Partial<Appointment>) {
    const appointment = await this.appointmentRepository.editAppointment(id, editAppointment);
    if (appointment.affected === 0 ) throw new NotFoundException("No se encontro el Aturno a actualizar")
    return id;
  }

  async finishAppointmentService(idAppointment: string) {
    const finishedApp = await this.appointmentRepository.finishAppointment(idAppointment)
    if (finishedApp.affected===0) throw new NotFoundException("El turno a finalizar no fue encontrado");
    return await this.appointmentRepository.getAppointmentById(idAppointment);
  }

  async cancelAppointmentService(idAppointment: string) {
    const canceledApp = await this.appointmentRepository.cancelAppointment(idAppointment)
    if (canceledApp.affected===0) throw new NotFoundException("El turno a Cancelar no fue encontrado");
    return await this.appointmentRepository.getAppointmentById(idAppointment);
  }
}
