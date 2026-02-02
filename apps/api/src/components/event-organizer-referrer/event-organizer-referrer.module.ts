import { Module } from '@nestjs/common';
import { EventOrganizerReferrerResolver } from './event-organizer-referrer.resolver';
import { EventOrganizerReferrerService } from './event-organizer-referrer.service';

@Module({
  providers: [EventOrganizerReferrerResolver, EventOrganizerReferrerService],
})
export class EventOrganizerReferrerModule {}
