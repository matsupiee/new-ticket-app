import { Module } from '@nestjs/common';
import { TicketTypeFeeDistributionResolver } from './ticket-type-fee-distribution.resolver';
import { TicketTypeFeeDistributionService } from './ticket-type-fee-distribution.service';

@Module({
  providers: [
    TicketTypeFeeDistributionResolver,
    TicketTypeFeeDistributionService,
  ],
})
export class TicketTypeFeeDistributionModule {}
