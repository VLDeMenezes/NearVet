import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthGlobalModule } from './modules/authGlobal/authGlobal.module';
import { EmailModule } from './modules/email/email.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CategoryServicesModule } from './modules/categoryServices/categoryServices.module';
import { ServicesModule } from './modules/services/services.module';
import { VeterinarianModule } from './modules/veterinarian/veterinarian.module';
import { VetsModule } from './modules/vets/vets.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { SpeciesModule } from './modules/species/species.module';
import { TreatmentModule } from './modules/treatment/treatment.module';
import { ClinicalExaminationModule } from './modules/clinical-examination/clinical-examination.module';
import { ProductsModule } from './modules/products/products.module';
//import { CategoryProductsModule } from './modules/categoryProducts/categoryProducts.module';
import { RacesModule } from './modules/races/races.module';
import { ApplicationProductModule } from './modules/applicationProduct/application-product.module';
//import { TypeServiceModule } from './modules/typeService/type-service.module';
import { FileTreatmentModule } from './modules/fileTraetment/file-treatment.module';
import { SalesModule } from './modules/sales/sales.module';
import { MethodPayModule } from './modules/method-pay/method-pay.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { AvailabilityServiceModule } from './modules/availabilityService/availabilityService.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PendingModule } from './modules/pending/pending.module';
import { SaleProductsModule } from './modules/sale-products/sale-products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SaleServicesModule } from './modules/sale-services/sale-services.module';
import { Prescription } from './modules/prescription/entities/prescription.entity';
import { PrescriptionModule } from './modules/prescription/prescription.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),

    // modulo para generar los token
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '5h' },
      secret: process.env.JWT_SECRET,
    }),
    AuthGlobalModule,
    AppointmentModule,
    UsersModule,
    PetsModule,
    EmailModule,
    SeederModule,
    CategoryServicesModule,
    ServicesModule,
    VeterinarianModule,
    VetsModule,
    SpeciesModule,
    RacesModule,
    TreatmentModule,
    ClinicalExaminationModule,
    ProductsModule,
    ApplicationProductModule,
    FileTreatmentModule,
    SalesModule,
    MethodPayModule,
    CouponsModule,
    AvailabilityServiceModule,
    SaleServicesModule,
    PendingModule,
    SaleProductsModule,
    PrescriptionModule,
    PaymentsModule,
  ],

  controllers: [],
  providers: [CloudinaryConfig, CloudinaryService],
})
export class AppModule {}
