import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { TicketType } from 'src/generated/prisma-nestjs-graphql';
import { TicketTypeConnection } from './dto/ticket-type.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketTypesArgs } from './dto/ticket-types.args';
import { TicketTypeService } from './ticket-type.service';

@Resolver(() => TicketType)
export class TicketTypeResolver {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

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
}
