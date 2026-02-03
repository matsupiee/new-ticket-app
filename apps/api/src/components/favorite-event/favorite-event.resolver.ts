import {
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Event, FavoriteEvent, User } from 'src/generated/prisma-nestjs-graphql';
import { FavoriteEventService } from './favorite-event.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => FavoriteEvent)
export class FavoriteEventResolver {
  constructor(
    private readonly favoriteEventService: FavoriteEventService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => User)
  async user(@Parent() favoriteEvent: FavoriteEvent) {
    return await this.prisma.favoriteEvent
      .findUnique({
        where: {
          userId_eventId: {
            userId: favoriteEvent.userId,
            eventId: favoriteEvent.eventId,
          },
        },
      })
      .user();
  }

  @ResolveField(() => Event)
  async event(@Parent() favoriteEvent: FavoriteEvent) {
    return await this.prisma.favoriteEvent
      .findUnique({
        where: {
          userId_eventId: {
            userId: favoriteEvent.userId,
            eventId: favoriteEvent.eventId,
          },
        },
      })
      .event();
  }
}
