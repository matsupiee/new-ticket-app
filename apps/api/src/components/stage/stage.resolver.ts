import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Stage } from 'src/generated/prisma-nestjs-graphql';
import { StageConnection } from './dto/stage.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { StagesArgs } from './dto/stages.args';
import { StageService } from './stage.service';

@Resolver(() => Stage)
export class StageResolver {
  constructor(private readonly stageService: StageService) {}

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
}
