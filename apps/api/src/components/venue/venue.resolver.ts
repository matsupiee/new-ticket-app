import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Venue } from 'src/generated/prisma-nestjs-graphql';
import { VenueConnection } from './dto/venue.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { VenuesArgs } from './dto/venues.args';
import { VenueService } from './venue.service';
import { VenueCreateInput } from './dto/venue-create.input';
import { VenueCreatePayload } from './dto/venue-create.payload';
import { UseGuards } from '@nestjs/common';
import { EasyGuard } from '../guard/easy-guard';

@Resolver(() => Venue)
export class VenueResolver {
  constructor(private readonly venueService: VenueService) {}

  @Query(() => Venue, {
    description: '会場を1件取得する',
    nullable: true,
  })
  async venue(@Args('id', { type: () => ID }) id: string) {
    return this.venueService.findOne(id);
  }

  @Query(() => VenueConnection, {
    description: '会場を複数取得する',
  })
  async venues(
    @Args() args: VenuesArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<VenueConnection> {
    return this.venueService.findMany(args, resolveInfo);
  }

  @Mutation(() => VenueCreatePayload, {
    description: '会場を作成する',
  })
  @UseGuards(EasyGuard)
  async venueCreate(
    @Args('input') input: VenueCreateInput,
  ): Promise<VenueCreatePayload> {
    const venue = await this.venueService.create(input);
    return { venue };
  }
}
