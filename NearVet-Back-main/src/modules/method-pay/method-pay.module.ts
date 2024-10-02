
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MethodPayController } from './method-pay.controller';
import { MethodPayService } from './method-pay.service';
import { MethodPay } from './entities/method-pay.entity';
import { MethodPayRepository } from './method-pay.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MethodPay])],
  controllers: [MethodPayController],
  providers: [MethodPayService, MethodPayRepository],
  exports: [MethodPayService],
})
export class MethodPayModule {}
