import { Module } from '@nestjs/common';
import { TicketApplicationResolver } from './ticket-application.resolver';
import { TicketApplicationService } from './ticket-application.service';

@Module({
  providers: [TicketApplicationResolver, TicketApplicationService],
})
export class TicketApplicationModule {}
