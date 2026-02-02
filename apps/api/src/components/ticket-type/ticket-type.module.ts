import { Module } from '@nestjs/common';
import { TicketTypeResolver } from './ticket-type.resolver';
import { TicketTypeService } from './ticket-type.service';

@Module({
  providers: [TicketTypeResolver, TicketTypeService],
})
export class TicketTypeModule {}
