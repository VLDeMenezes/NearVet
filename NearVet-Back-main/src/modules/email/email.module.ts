import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailProvider } from './email.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Vet } from '../vets/entities/vet.entity';
import { Pet } from '../pets/entities/pet.entity';
import { Coupon } from '../coupons/entities/coupon.entity';
import { Pending } from '../pending/entities/pending.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Vet, Pet, Coupon, Pending])],
  controllers: [],
  providers: [EmailService, EmailProvider],
})
export class EmailModule {}
