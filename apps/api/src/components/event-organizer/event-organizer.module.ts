import { Module } from '@nestjs/common';
import { EventOrganizerResolver } from './event-organizer.resolver';
import { EventOrganizerService } from './event-organizer.service';

@Module({
  providers: [EventOrganizerResolver, EventOrganizerService],
})
export class EventOrganizerModule {}
