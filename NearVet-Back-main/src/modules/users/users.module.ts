import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//import { sendEmail } from '../../services/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UserRole } from './entities/userRole.entity';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CloudinaryService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
