import { Module } from '@nestjs/common';
import { FileTreatmentService } from './file-treatment.service';
import { FileTreatmentController } from './file-treatment.controller';
import { FileTraetmentRepository } from './file-treatment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTreatment } from './entities/file-treatment.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileTreatment])],
  controllers: [FileTreatmentController],
  providers: [FileTreatmentService, FileTraetmentRepository, CloudinaryService],
})
export class FileTreatmentModule {}
