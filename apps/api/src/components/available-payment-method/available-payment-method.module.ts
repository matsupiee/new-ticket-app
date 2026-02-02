import { Module } from '@nestjs/common';
import { AvailablePaymentMethodResolver } from './available-payment-method.resolver';
import { AvailablePaymentMethodService } from './available-payment-method.service';

@Module({
  providers: [
    AvailablePaymentMethodResolver,
    AvailablePaymentMethodService,
  ],
})
export class AvailablePaymentMethodModule {}
