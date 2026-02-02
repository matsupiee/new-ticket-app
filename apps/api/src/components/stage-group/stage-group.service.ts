import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { StageGroup } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { StageGroupsArgs } from './dto/stage-groups.args';
import { StageGroupConnection } from './dto/stage-group.connection';

@Injectable()
export class StageGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<StageGroup | null> {
    return this.prisma.stageGroup.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: StageGroupsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<StageGroupConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.stageGroup.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.stageGroup.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
