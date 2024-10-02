import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { UserRole } from '../users/entities/userRole.entity';
import { EmailService } from '../email/email.service';
import { EmailProvider } from '../email/email.provider';
import { Vet } from '../vets/entities/vet.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Pet } from '../pets/entities/pet.entity';
import { Coupon } from '../coupons/entities/coupon.entity';
import { Pending } from '../pending/entities/pending.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Vet, Appointment, Pet, Coupon, Pending])],
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UsersRepository, EmailService, EmailProvider],
})
export class AuthGlobalModule {
}
