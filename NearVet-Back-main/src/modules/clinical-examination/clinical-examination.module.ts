import { Module } from '@nestjs/common';
import { ClinicalExaminationService } from './clinical-examination.service';
import { ClinicalExaminationController } from './clinical-examination.controller';
import { ClinicalExaminationRepository } from './clinical-examination.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalExamination } from './entities/clinicalExamination.entity';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { SalesService } from '../sales/sales.service';
import { SalesRepository } from '../sales/sales.repository';
import { Sale } from '../sales/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalExamination, Veterinarian, Sale])],
  controllers: [ClinicalExaminationController],
  providers: [ClinicalExaminationService, ClinicalExaminationRepository, SalesService, SalesRepository],
})
export class ClinicalExaminationModule {}
