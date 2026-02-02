import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { SaleSchedule } from 'src/generated/prisma-nestjs-graphql';
import { SaleScheduleConnection } from './dto/sale-schedule.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { SaleSchedulesArgs } from './dto/sale-schedules.args';
import { SaleScheduleService } from './sale-schedule.service';

@Resolver(() => SaleSchedule)
export class SaleScheduleResolver {
  constructor(private readonly saleScheduleService: SaleScheduleService) {}

  @Query(() => SaleSchedule, {
    description: '販売スケジュールを1件取得する',
    nullable: true,
  })
  async saleSchedule(@Args('id', { type: () => ID }) id: string) {
    return this.saleScheduleService.findOne(id);
  }

  @Query(() => SaleScheduleConnection, {
    description: '販売スケジュールを複数取得する',
  })
  async saleSchedules(
    @Args() args: SaleSchedulesArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<SaleScheduleConnection> {
    return this.saleScheduleService.findMany(args, resolveInfo);
  }
}
