import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { FeaturedEvent } from 'src/generated/prisma-nestjs-graphql';
import { FeaturedEventConnection } from './dto/featured-event.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { FeaturedEventsArgs } from './dto/featured-events.args';
import { FeaturedEventService } from './featured-event.service';

@Resolver(() => FeaturedEvent)
export class FeaturedEventResolver {
  constructor(private readonly featuredEventService: FeaturedEventService) {}

  @Query(() => FeaturedEvent, {
    description: '特集イベントを1件取得する',
    nullable: true,
  })
  async featuredEvent(@Args('id', { type: () => ID }) id: string) {
    return this.featuredEventService.findOne(id);
  }

  @Query(() => FeaturedEventConnection, {
    description: '特集イベントを複数取得する',
  })
  async featuredEvents(
    @Args() args: FeaturedEventsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<FeaturedEventConnection> {
    return this.featuredEventService.findMany(args, resolveInfo);
  }
}
