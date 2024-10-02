import { Module } from '@nestjs/common';
import { VeterinarianService } from './veterinarian.service';
import { VeterinarianController } from './veterinarian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinarian } from './entities/veterinarian.entity';
import { VeterinarianRepository } from './veterinarian.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/userRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinarian, User, UserRole])],
  controllers: [VeterinarianController],
  providers: [VeterinarianService, VeterinarianRepository, UsersRepository],
})
export class VeterinarianModule {}
