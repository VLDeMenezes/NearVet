import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { StatesAppointment } from './entities/statesAppointment.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(StatesAppointment)
    private readonly statesAppointmentRepository: Repository<StatesAppointment>
  ) {}

  async getAppointments(page: number, limit: number) {
    console.log(page, "   ",limit)
    return this.appointmentRepository.find({ take: limit, skip: (page - 1) * limit, relations: { pet: true, state: true } });
  }

  async getAppointmentById(idAppointment: string): Promise<Appointment> {
    return await this.appointmentRepository.findOne({
      where: { id: idAppointment },
      relations: { pet: {race:true, specie:true, sex:true}, state: true, service: {veterinarian: {user:true}} },
    })
  }

  async getAppointmentsByUserId(userId: string, page:number=1, limit:number=5) {
    return await this.appointmentRepository.find({
      skip: (page-1)*limit,
      take: limit,
      where: { pet: { userId } },
      relations: { pet: true, service: true, state: true,}
    });
  }

  async getAppointmentsByPetId(petId: string, page:number=1, limit:number=5) {
    return await this.appointmentRepository.find({
      skip: (page-1)*limit,
      take: limit,
      where: { petId },
      relations: { pet: true, service: true, state: true,}
    });
  }

  async getAppointmentsByVeterinarianAndDate (userId:string, startDate: Date, endDate: Date): Promise<Appointment[]> {

       return await this.appointmentRepository.find({
        select: {id:true, messageUser:true, time:true, date:true ,service: {service:true, durationMin:true}, pet: {name:true, user: {name:true, lastName:true,}}},
         where: {service: {veterinarian: {userId}}, date: Between(startDate, endDate)},
         relations: {service: true , pet: {user:true}, state:true}
       })
     }
  
  async getAppointmentsByAdminAndDate(startDate: Date, endDate: Date) {
    return await this.appointmentRepository.find({
      select: {id:true, messageUser:true, time:true, date:true ,service: {service:true, durationMin:true}, pet: {name:true, user: {name:true, lastName:true,}}},
       where: {date: Between(startDate, endDate)},
       relations: {service: true , pet: {user:true}, state:true}
     })
  }

  async getAppointmentsActive(): Promise<Appointment[]> {

    const appointments = await this.appointmentRepository.find({
      where: { state: {state:"Pendiente"} 
       }, // Usa el operador In para filtrar por múltiples IDs de mascotas
      relations: {
        pet: true,
        service: true,
        state: true,
      },
    });
    return appointments;
  }

  async createAppointment(createAppointment: Partial<Appointment>) {
    const state = await this.statesAppointmentRepository.findOne({ where: { state: 'Pendiente' } });
    return  await this.appointmentRepository.save({
      ...createAppointment,
      stateAppointmentId: state.id,
    });
  }

  async editAppointment(id: string, editAppointment: Partial<Appointment>) {
    return await this.appointmentRepository.update(id, editAppointment);
  }

  async finishAppointment(idAppointment: string) {
    const stateApp = await this.statesAppointmentRepository.findOne({ where: { state: 'Finalizado' } });
    return await this.appointmentRepository.update(idAppointment, {
      stateAppointmentId: stateApp.id,
    });
  }

  async cancelAppointment(idAppointment: string) {
    const stateApp = await this.statesAppointmentRepository.findOne({ where: { state: 'Cancelado' } });
    return await this.appointmentRepository.update(idAppointment, {
      stateAppointmentId: stateApp.id,
    });
  }
}
