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
  AvailablePaymentMethod,
  Event,
  SaleSchedule,
  TicketType,
} from 'src/generated/prisma-nestjs-graphql';
import { SaleScheduleConnection } from './dto/sale-schedule.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { SaleSchedulesArgs } from './dto/sale-schedules.args';
import { SaleScheduleService } from './sale-schedule.service';
import { PrismaService } from '../prisma/prisma.service';
import { SaleScheduleUpdateInput } from './dto/sale-schedule-update.input';
import { SaleScheduleUpdatePayload } from './dto/sale-schedule-update.payload';
import { SaleScheduleCreateInput } from './dto/sale-schedule-create.input';
import { SaleScheduleCreatePayload } from './dto/sale-schedule-create.payload';
import { UseGuards } from '@nestjs/common';
import { EasyGuard } from '../guard/easy-guard';

@Resolver(() => SaleSchedule)
export class SaleScheduleResolver {
  constructor(
    private readonly saleScheduleService: SaleScheduleService,
    private readonly prisma: PrismaService,
  ) {}

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

  @ResolveField(() => Event)
  async event(@Parent() saleSchedule: SaleSchedule) {
    return await this.prisma.saleSchedule
      .findUnique({ where: { id: saleSchedule.id } })
      .event();
  }

  @ResolveField(() => [TicketType])
  async ticketTypes(@Parent() saleSchedule: SaleSchedule) {
    return await this.prisma.saleSchedule
      .findUnique({ where: { id: saleSchedule.id } })
      .ticketTypes();
  }

  @ResolveField(() => [AvailablePaymentMethod])
  async availablePaymentMethods(@Parent() saleSchedule: SaleSchedule) {
    return await this.prisma.saleSchedule
      .findUnique({ where: { id: saleSchedule.id } })
      .availablePaymentMethods();
  }

  @Mutation(() => SaleScheduleCreatePayload, {
    description: '販売スケジュールを作成する',
  })
  @UseGuards(EasyGuard)
  async saleScheduleCreate(
    @Args('input') input: SaleScheduleCreateInput,
  ): Promise<SaleScheduleCreatePayload> {
    const saleSchedule = await this.saleScheduleService.create(input);
    return { saleSchedule };
  }

  @Mutation(() => SaleScheduleUpdatePayload, {
    description: '販売スケジュールを更新する',
  })
  @UseGuards(EasyGuard)
  async saleScheduleUpdate(
    @Args('input') input: SaleScheduleUpdateInput,
  ): Promise<SaleScheduleUpdatePayload> {
    const saleSchedule = await this.saleScheduleService.update(input);
    return { saleSchedule };
  }
}
