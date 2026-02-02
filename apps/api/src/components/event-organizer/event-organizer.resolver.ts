import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { EventOrganizer } from 'src/generated/prisma-nestjs-graphql';
import { EventOrganizerConnection } from './dto/event-organizer.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { EventOrganizersArgs } from './dto/event-organizers.args';
import { EventOrganizerService } from './event-organizer.service';

@Resolver(() => EventOrganizer)
export class EventOrganizerResolver {
  constructor(private readonly eventOrganizerService: EventOrganizerService) {}

  @Query(() => EventOrganizer, {
    description: 'イベント主催者を1件取得する',
    nullable: true,
  })
  async eventOrganizer(@Args('id', { type: () => ID }) id: string) {
    return this.eventOrganizerService.findOne(id);
  }

  @Query(() => EventOrganizerConnection, {
    description: 'イベント主催者を複数取得する',
  })
  async eventOrganizers(
    @Args() args: EventOrganizersArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<EventOrganizerConnection> {
    return this.eventOrganizerService.findMany(args, resolveInfo);
  }
}
