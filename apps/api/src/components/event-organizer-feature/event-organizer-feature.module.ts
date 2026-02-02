import { Module } from '@nestjs/common';
import { EventOrganizerFeatureResolver } from './event-organizer-feature.resolver';
import { EventOrganizerFeatureService } from './event-organizer-feature.service';

@Module({
  providers: [EventOrganizerFeatureResolver, EventOrganizerFeatureService],
})
export class EventOrganizerFeatureModule {}
