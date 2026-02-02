import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { FavoriteEvent } from 'src/generated/prisma-nestjs-graphql';
import { FavoriteEventService } from './favorite-event.service';

@Resolver(() => FavoriteEvent)
export class FavoriteEventResolver {
  constructor(private readonly favoriteEventService: FavoriteEventService) {}
}
