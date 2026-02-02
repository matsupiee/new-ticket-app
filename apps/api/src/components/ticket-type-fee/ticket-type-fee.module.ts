import { Module } from '@nestjs/common';
import { TicketTypeFeeResolver } from './ticket-type-fee.resolver';
import { TicketTypeFeeService } from './ticket-type-fee.service';

@Module({
  providers: [TicketTypeFeeResolver, TicketTypeFeeService],
})
export class TicketTypeFeeModule {}
