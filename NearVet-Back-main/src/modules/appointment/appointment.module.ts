import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from '../pets/pets.module';
import { UsersModule } from '../users/users.module';
import { StatesAppointment } from './entities/statesAppointment.entity';
import { ServicesModule } from '../services/services.module';
import { Pet } from '../pets/entities/pet.entity';
import { Service } from '../services/entities/service.entity';
import { EmailService } from '../email/email.service';
import { EmailProvider } from '../email/email.provider';
import { Vet } from '../vets/entities/vet.entity';
import { Pending } from '../pending/entities/pending.entity';
import { Coupon } from '../coupons/entities/coupon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, StatesAppointment, Pet, Service, Vet, Pending, Coupon]), // Registra la entidad Appointment
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository, EmailService, EmailProvider],
})
export class AppointmentModule {}
