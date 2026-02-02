import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from 'src/generated/prisma-nestjs-graphql';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { EventConnection } from './dto/event.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { EventsArgs } from './dto/events.args';
import { EventDeletePayload } from './dto/event-delete.payload';
import { EasyGuard } from '../guard/easy-guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Event, {
    description: 'イベントを1件取得する',
    nullable: true,
  })
  async event(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  @Query(() => EventConnection, {
    description: 'イベントを複数取得する',
  })
  @UseGuards(EasyGuard)
  async events(
    @Args() args: EventsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<EventConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.event.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.event.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }

  // @Mutation(() => EventCreatePayload, {
  //   description: 'イベントを作成する',
  // })
  // async eventCreate(
  //   @Args('input') input: EventCreateInput,
  // ): Promise<EventCreatePayload> {
  //   const event = await this.prisma.event.create({
  //     data: input,
  //   });
  //   return { event };
  // }

  // @Mutation(() => EventUpdatePayload, {
  //   description: 'イベントを更新する',
  // })
  // @UseGuards(EasyGuard)
  // async eventUpdate(
  //   @Args('input') input: EventUpdateInput,
  // ): Promise<EventUpdatePayload> {
  //   const { id, ...data } = input;
  //   const event = await this.prisma.event.update({
  //     where: { id },
  //     data,
  //     include: { tickets: true },
  //   });
  //   return { event };
  // }

  @Mutation(() => EventDeletePayload, {
    description: 'イベントを削除する',
  })
  async eventDelete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<EventDeletePayload> {
    const event = await this.prisma.event.delete({
      where: { id },
    });
    return { event };
  }
}
