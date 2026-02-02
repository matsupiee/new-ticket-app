import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { EventOrganizerFeature } from 'src/generated/prisma-nestjs-graphql';
import { EventOrganizerFeatureConnection } from './dto/event-organizer-feature.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { EventOrganizerFeaturesArgs } from './dto/event-organizer-features.args';
import { EventOrganizerFeatureService } from './event-organizer-feature.service';

@Resolver(() => EventOrganizerFeature)
export class EventOrganizerFeatureResolver {
  constructor(
    private readonly eventOrganizerFeatureService: EventOrganizerFeatureService,
  ) {}

  @Query(() => EventOrganizerFeature, {
    description: 'イベント主催者機能を1件取得する',
    nullable: true,
  })
  async eventOrganizerFeature(@Args('id', { type: () => ID }) id: string) {
    return this.eventOrganizerFeatureService.findOne(id);
  }

  @Query(() => EventOrganizerFeatureConnection, {
    description: 'イベント主催者機能を複数取得する',
  })
  async eventOrganizerFeatures(
    @Args() args: EventOrganizerFeaturesArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<EventOrganizerFeatureConnection> {
    return this.eventOrganizerFeatureService.findMany(args, resolveInfo);
  }
}
