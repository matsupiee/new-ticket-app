import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Stage } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { StagesArgs } from './dto/stages.args';
import { StageConnection } from './dto/stage.connection';
import { StagesUpdateInput } from './dto/stages-update.input';

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

  async updateStages(input: StagesUpdateInput) {
    const existingStages = await this.prisma.stage.findMany({
      where: {
        eventId: input.eventId,
        id: { in: input.stages.map((stage) => stage.id) },
      },
      select: { id: true },
    });
    if (existingStages.length !== input.stages.length) {
      throw new Error('ステージが見つかりません');
    }

    return await this.prisma.$transaction(async (tx) => {
      return await Promise.all(
        input.stages.map(async (stage) => {
          const updatedStage = await tx.stage.update({
            where: { id: stage.id },
            data: {
              name: stage.name,
              venueId: stage.venueId,
              doorsOpenAt: stage.doorsOpenAt,
              startAt: stage.startAt,
            },
          });

          await tx.stageArtist.deleteMany({
            where: { stageId: stage.id },
          });

          if (stage.artistIds && stage.artistIds.length > 0) {
            await tx.stageArtist.createMany({
              data: stage.artistIds.map((artistId) => ({
                stageId: stage.id,
                artistId,
              })),
              skipDuplicates: true,
            });
          }

          return updatedStage;
        }),
      );
    });
  }
}
