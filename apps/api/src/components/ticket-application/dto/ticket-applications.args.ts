import { ArgsType, Field } from '@nestjs/graphql';
import {
  TicketApplicationOrderByWithRelationInput,
  TicketApplicationWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class TicketApplicationsArgs extends ConnectionArgs {
  @Field(() => TicketApplicationWhereInput, { nullable: true })
  where?: TicketApplicationWhereInput;

  @Field(() => [TicketApplicationOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TicketApplicationOrderByWithRelationInput>;
}
