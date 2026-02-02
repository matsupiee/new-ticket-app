import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { StageGroup } from 'src/generated/prisma-nestjs-graphql';
import { StageGroupConnection } from './dto/stage-group.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { StageGroupsArgs } from './dto/stage-groups.args';
import { StageGroupService } from './stage-group.service';

@Resolver(() => StageGroup)
export class StageGroupResolver {
  constructor(private readonly stageGroupService: StageGroupService) {}

  @Query(() => StageGroup, {
    description: 'ステージグループを1件取得する',
    nullable: true,
  })
  async stageGroup(@Args('id', { type: () => ID }) id: string) {
    return this.stageGroupService.findOne(id);
  }

  @Query(() => StageGroupConnection, {
    description: 'ステージグループを複数取得する',
  })
  async stageGroups(
    @Args() args: StageGroupsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<StageGroupConnection> {
    return this.stageGroupService.findMany(args, resolveInfo);
  }
}
