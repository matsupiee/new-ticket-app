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
  SaleSchedule,
  StageTicketType,
  Ticket,
  TicketApplicationItem,
  TicketType,
  TicketTypeFee,
  TicketTypeFeeDistribution,
  TicketTypePriceDistribution,
} from 'src/generated/prisma-nestjs-graphql';
import { TicketTypeConnection } from './dto/ticket-type.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketTypesArgs } from './dto/ticket-types.args';
import { TicketTypeService } from './ticket-type.service';
import { PrismaService } from '../prisma/prisma.service';
import { TicketTypeUpdateInput } from './dto/ticket-type-update.input';
import { TicketTypeUpdatePayload } from './dto/ticket-type-update.payload';
import { UseGuards } from '@nestjs/common';
import { EasyGuard } from '../guard/easy-guard';

@Resolver(() => TicketType)
export class TicketTypeResolver {
  constructor(
    private readonly ticketTypeService: TicketTypeService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => TicketType, {
    description: 'チケットタイプを1件取得する',
    nullable: true,
  })
  async ticketType(@Args('id', { type: () => ID }) id: string) {
    return this.ticketTypeService.findOne(id);
  }

  @Query(() => TicketTypeConnection, {
    description: 'チケットタイプを複数取得する',
  })
  async ticketTypes(
    @Args() args: TicketTypesArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketTypeConnection> {
    return this.ticketTypeService.findMany(args, resolveInfo);
  }

  @Mutation(() => TicketTypeUpdatePayload, {
    description: 'チケットタイプを更新する',
  })
  @UseGuards(EasyGuard)
  async ticketTypeUpdate(
    @Args('input') input: TicketTypeUpdateInput,
  ): Promise<TicketTypeUpdatePayload> {
    const ticketType = await this.ticketTypeService.update(input);
    return { ticketType };
  }

  @ResolveField(() => SaleSchedule)
  async saleSchedule(@Parent() ticketType: TicketType) {
    return await this.prisma.ticketType
      .findUnique({ where: { id: ticketType.id } })
      .saleSchedule();
  }

  @ResolveField(() => [StageTicketType])
  async stageTicketTypes(@Parent() ticketType: TicketType) {
    return await this.prisma.ticketType
      .findUnique({ where: { id: ticketType.id } })
      .stageTicketTypes();
  }

  @ResolveField(() => [TicketTypeFee])
  async ticketTypeFees(@Parent() ticketType: TicketType) {
    return await this.prisma.ticketType
      .findUnique({ where: { id: ticketType.id } })
      .ticketTypeFees();
  }

  @ResolveField(() => [TicketTypePriceDistribution])
  async ticketTypePriceDistributions(@Parent() ticketType: TicketType) {
    return await this.prisma.ticketType
      .findUnique({ where: { id: ticketType.id } })
      .ticketTypePriceDistributions();
  }

  @ResolveField(() => [TicketApplicationItem])
  async ticketApplicationItems(@Parent() ticketType: TicketType) {
    return await this.prisma.ticketType
      .findUnique({ where: { id: ticketType.id } })
      .ticketApplicationItems();
  }

  @ResolveField(() => [Ticket])
  async tickets(@Parent() ticketType: TicketType) {
    return await this.prisma.ticketType
      .findUnique({ where: { id: ticketType.id } })
      .tickets();
  }
}
