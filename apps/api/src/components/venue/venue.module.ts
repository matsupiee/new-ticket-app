import { Module } from '@nestjs/common';
import { VenueResolver } from './venue.resolver';
import { VenueService } from './venue.service';

@Module({
  providers: [VenueResolver, VenueService],
})
export class VenueModule {}
