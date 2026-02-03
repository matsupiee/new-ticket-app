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
  Stage,
  StageArtist,
  StageTicketType,
  Venue,
} from 'src/generated/prisma-nestjs-graphql';
import { StageConnection } from './dto/stage.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { StagesArgs } from './dto/stages.args';
import { StageService } from './stage.service';
import { UseGuards } from '@nestjs/common';
import { StagesUpdateInput } from './dto/stages-update.input';
import { StagesUpdatePayload } from './dto/stages-update.payload';
import { EasyGuard } from '../guard/easy-guard';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Stage)
export class StageResolver {
  constructor(
    private readonly stageService: StageService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Stage, {
    description: 'ステージを1件取得する',
    nullable: true,
  })
  async stage(@Args('id', { type: () => ID }) id: string) {
    return this.stageService.findOne(id);
  }

  @Query(() => StageConnection, {
    description: 'ステージを複数取得する',
  })
  async stages(
    @Args() args: StagesArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<StageConnection> {
    return this.stageService.findMany(args, resolveInfo);
  }

  @Mutation(() => StagesUpdatePayload, {
    description: 'イベントのステージ情報を更新する',
  })
  @UseGuards(EasyGuard)
  async stagesUpdate(
    @Args('input') input: StagesUpdateInput,
  ): Promise<StagesUpdatePayload> {
    const stages = await this.stageService.updateStages(input);
    return { stages };
  }

  @ResolveField(() => [StageArtist], {
    nullable: false,
  })
  async stageArtists(@Parent() stage: Stage) {
    return await this.prisma.stage
      .findUnique({ where: { id: stage.id } })
      .stageArtists();
  }

  @ResolveField(() => Venue, {
    nullable: true, // venueIdがnullの場合はnullを返す
  })
  async venue(@Parent() stage: Stage) {
    return await this.prisma.stage
      .findUnique({ where: { id: stage.id } })
      .venue();
  }

  @ResolveField(() => [StageTicketType], {
    nullable: false,
  })
  async stageTicketTypes(@Parent() stage: Stage) {
    return await this.prisma.stage
      .findUnique({ where: { id: stage.id } })
      .stageTicketTypes();
  }
}
