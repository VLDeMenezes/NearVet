import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Pet } from '../pets/entities/pet.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Sex } from '../pets/entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { StatesAppointment } from '../appointment/entities/statesAppointment.entity';
import { Specie } from '../species/entities/specie.entity';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { CategoryService } from '../categoryServices/entities/categoryService.entity';
import { Service } from '../services/entities/service.entity';
import { AvailabilityService } from '../availabilityService/entities/availability-service.entity';
import { Product } from '../products/entities/product.entity';
import { Vet } from '../vets/entities/vet.entity';
import { Pending } from '../pending/entities/pending.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { ClinicalExamination } from '../clinical-examination/entities/clinicalExamination.entity';
import { Treatment } from '../treatment/entities/treatment.entity';
import { Prescription } from '../prescription/entities/prescription.entity';
import { ClinicalExaminationService } from '../clinical-examination/clinical-examination.service';
import { ClinicalExaminationRepository } from '../clinical-examination/clinical-examination.repository';
import { SalesService } from '../sales/sales.service';
import { SalesRepository } from '../sales/sales.repository';
import { Sale } from '../sales/entities/sale.entity';
import { PrescriptionService } from '../prescription/prescription.service';
import { PrescriptionRepository } from '../prescription/prescription.repository';
import { SaleProduct } from '../sale-products/entities/sale-product.entity';
import { SaleProductsRepository } from '../sale-products/sale-products.repository';
import { SaleProductsService } from '../sale-products/sale-products.service';
import { TreatmentService } from '../treatment/treatment.service';
import { TreatmentRepository } from '../treatment/treatment.repository';
import { SaleServicesService } from '../sale-services/sale-services.service';
import { SaleServicesRepository } from '../sale-services/sale-services.repository';
import { SaleService } from '../sale-services/entities/sale-service.entity';
import { MethodPayRepository } from '../method-pay/method-pay.repository';
import { MethodPay } from '../method-pay/entities/method-pay.entity';
import { CouponsRepository } from '../coupons/coupons.repository';
import { Coupon } from '../coupons/entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, UserRole, Sex, Race, Specie, StatesAppointment, Veterinarian,
                                      CategoryService, Service, AvailabilityService, Product, 
                                      Vet, Pending, Appointment, ClinicalExamination, Treatment, Prescription,
                                      Sale, SaleProduct, SaleService, MethodPay, Coupon])],
  controllers: [SeederController],
  providers: [SeederService, ClinicalExaminationService, ClinicalExaminationRepository, SalesService, 
    SalesRepository, PrescriptionService, PrescriptionRepository, SaleProductsRepository, SaleProductsService,
    TreatmentService, TreatmentRepository, SaleServicesService, SaleServicesRepository, MethodPayRepository, CouponsRepository],
})
export class SeederModule {}
