import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { TicketApplicationItem } from 'src/generated/prisma-nestjs-graphql';
import { TicketApplicationItemConnection } from './dto/ticket-application-item.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketApplicationItemsArgs } from './dto/ticket-application-items.args';
import { TicketApplicationItemService } from './ticket-application-item.service';

@Resolver(() => TicketApplicationItem)
export class TicketApplicationItemResolver {
  constructor(
    private readonly ticketApplicationItemService: TicketApplicationItemService,
  ) {}

  @Query(() => TicketApplicationItem, {
    description: 'チケット申し込みアイテムを1件取得する',
    nullable: true,
  })
  async ticketApplicationItem(@Args('id', { type: () => ID }) id: string) {
    return this.ticketApplicationItemService.findOne(id);
  }

  @Query(() => TicketApplicationItemConnection, {
    description: 'チケット申し込みアイテムを複数取得する',
  })
  async ticketApplicationItems(
    @Args() args: TicketApplicationItemsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketApplicationItemConnection> {
    return this.ticketApplicationItemService.findMany(args, resolveInfo);
  }
}
