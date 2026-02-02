import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { TicketApplication } from 'src/generated/prisma-nestjs-graphql';
import { TicketApplicationConnection } from './dto/ticket-application.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketApplicationsArgs } from './dto/ticket-applications.args';
import { TicketApplicationService } from './ticket-application.service';

@Resolver(() => TicketApplication)
export class TicketApplicationResolver {
  constructor(
    private readonly ticketApplicationService: TicketApplicationService,
  ) {}

  @Query(() => TicketApplication, {
    description: 'チケット申し込みを1件取得する',
    nullable: true,
  })
  async ticketApplication(@Args('id', { type: () => ID }) id: string) {
    return this.ticketApplicationService.findOne(id);
  }

  @Query(() => TicketApplicationConnection, {
    description: 'チケット申し込みを複数取得する',
  })
  async ticketApplications(
    @Args() args: TicketApplicationsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketApplicationConnection> {
    return this.ticketApplicationService.findMany(args, resolveInfo);
  }
}
