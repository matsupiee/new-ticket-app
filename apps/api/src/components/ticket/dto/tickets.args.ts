import { ArgsType, Field } from '@nestjs/graphql';
import {
  TicketOrderByWithRelationInput,
  TicketWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class TicketsArgs extends ConnectionArgs {
  @Field(() => TicketWhereInput, { nullable: true })
  where?: TicketWhereInput;

  @Field(() => [TicketOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TicketOrderByWithRelationInput>;
}
