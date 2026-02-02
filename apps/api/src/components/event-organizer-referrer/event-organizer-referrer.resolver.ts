import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { EventOrganizerReferrer } from 'src/generated/prisma-nestjs-graphql';
import { EventOrganizerReferrerConnection } from './dto/event-organizer-referrer.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { EventOrganizerReferrersArgs } from './dto/event-organizer-referrers.args';
import { EventOrganizerReferrerService } from './event-organizer-referrer.service';

@Resolver(() => EventOrganizerReferrer)
export class EventOrganizerReferrerResolver {
  constructor(
    private readonly eventOrganizerReferrerService: EventOrganizerReferrerService,
  ) {}

  @Query(() => EventOrganizerReferrer, {
    description: 'イベント主催者紹介者を1件取得する',
    nullable: true,
  })
  async eventOrganizerReferrer(@Args('id', { type: () => ID }) id: string) {
    return this.eventOrganizerReferrerService.findOne(id);
  }

  @Query(() => EventOrganizerReferrerConnection, {
    description: 'イベント主催者紹介者を複数取得する',
  })
  async eventOrganizerReferrers(
    @Args() args: EventOrganizerReferrersArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<EventOrganizerReferrerConnection> {
    return this.eventOrganizerReferrerService.findMany(args, resolveInfo);
  }
}
