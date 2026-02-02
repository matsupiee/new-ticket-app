import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { SaleSchedule } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { SaleSchedulesArgs } from './dto/sale-schedules.args';
import { SaleScheduleConnection } from './dto/sale-schedule.connection';

@Injectable()
export class SaleScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<SaleSchedule | null> {
    return this.prisma.saleSchedule.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: SaleSchedulesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<SaleScheduleConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.saleSchedule.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.saleSchedule.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
