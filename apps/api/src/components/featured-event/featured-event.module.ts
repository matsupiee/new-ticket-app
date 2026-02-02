import { Module } from '@nestjs/common';
import { FeaturedEventResolver } from './featured-event.resolver';
import { FeaturedEventService } from './featured-event.service';

@Module({
  providers: [FeaturedEventResolver, FeaturedEventService],
})
export class FeaturedEventModule {}
