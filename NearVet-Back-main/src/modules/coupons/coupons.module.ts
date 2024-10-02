import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponsRepository } from './coupons.repository';
import { EmailService } from '../email/email.service';
import { EmailProvider } from '../email/email.provider';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Vet } from '../vets/entities/vet.entity';
import { Pet } from '../pets/entities/pet.entity';
import { Pending } from '../pending/entities/pending.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, Appointment, Vet, Pet, Pending])],
  controllers: [CouponsController],
  providers: [CouponsService, CouponsRepository, EmailService, EmailProvider]
})
export class CouponsModule {}
