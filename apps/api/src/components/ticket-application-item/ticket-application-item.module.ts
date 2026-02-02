import { Module } from '@nestjs/common';
import { TicketApplicationItemResolver } from './ticket-application-item.resolver';
import { TicketApplicationItemService } from './ticket-application-item.service';

@Module({
  providers: [TicketApplicationItemResolver, TicketApplicationItemService],
})
export class TicketApplicationItemModule {}
