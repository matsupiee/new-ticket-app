import {
  Args,
  ID,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Event,
  EventOrganizer,
  FavoriteEvent,
  FeaturedEvent,
  SaleSchedule,
  Stage,
} from 'src/generated/prisma-nestjs-graphql';
import { EventConnection } from './dto/event.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { EventsArgs } from './dto/events.args';
import { EventDeletePayload } from './dto/event-delete.payload';
import { EventCreateInput } from './dto/event-create.input';
import { EventCreatePayload } from './dto/event-create.payload';
import { EventService } from './event.service';
import { EasyGuard } from '../guard/easy-guard';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Event, {
    description: 'イベントを1件取得する',
    nullable: true,
  })
  async event(@Args('id', { type: () => ID }) id: string) {
    return this.eventService.findOne(id);
  }

  @Query(() => EventConnection, {
    description: 'イベントを複数取得する',
  })
  @UseGuards(EasyGuard)
  async events(
    @Args() args: EventsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<EventConnection> {
    return this.eventService.findMany(args, resolveInfo);
  }

  @Mutation(() => EventCreatePayload, {
    description: 'イベントを作成する',
  })
  @UseGuards(EasyGuard)
  async eventCreate(
    @Args('input') input: EventCreateInput,
  ): Promise<EventCreatePayload> {
    const event = await this.eventService.create(input);
    return { event };
  }

  @Mutation(() => EventDeletePayload, {
    description: 'イベントを削除する',
  })
  async eventDelete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<EventDeletePayload> {
    const event = await this.eventService.delete(id);
    return { event };
  }

  @ResolveField(() => EventOrganizer)
  async eventOrganizer(@Parent() event: Event) {
    return await this.prisma.event
      .findUnique({ where: { id: event.id } })
      .eventOrganizer();
  }

  @ResolveField(() => [FavoriteEvent])
  async favoriteEvents(@Parent() event: Event) {
    return await this.prisma.event
      .findUnique({ where: { id: event.id } })
      .favoriteEvents();
  }

  @ResolveField(() => FeaturedEvent, { nullable: true })
  async featuredEvent(@Parent() event: Event) {
    return await this.prisma.event
      .findUnique({ where: { id: event.id } })
      .featuredEvent();
  }

  @ResolveField(() => [SaleSchedule])
  async saleSchedules(@Parent() event: Event) {
    return await this.prisma.event
      .findUnique({ where: { id: event.id } })
      .saleSchedules();
  }

  @ResolveField(() => [Stage])
  async stages(@Parent() event: Event) {
    return await this.prisma.event
      .findUnique({ where: { id: event.id } })
      .stages();
  }
}
