import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { StripeService } from './stripe/stripe.service';

@Module({
  controllers: [PaymentsController],
  providers: [StripeService],
})
export class PaymentsModule {}
