import { Module } from '@nestjs/common';
import { FavoriteEventResolver } from './favorite-event.resolver';
import { FavoriteEventService } from './favorite-event.service';

@Module({
  providers: [FavoriteEventResolver, FavoriteEventService],
})
export class FavoriteEventModule {}
