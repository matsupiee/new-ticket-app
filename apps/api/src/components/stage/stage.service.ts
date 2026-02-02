import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Stage } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { StagesArgs } from './dto/stages.args';
import { StageConnection } from './dto/stage.connection';

@Injectable()
export class StageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Stage | null> {
    return this.prisma.stage.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: StagesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<StageConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.stage.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.stage.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
