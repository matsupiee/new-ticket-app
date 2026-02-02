import { ArgsType, Field } from '@nestjs/graphql';
import {
  TicketTypeFeeOrderByWithRelationInput,
  TicketTypeFeeWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class TicketTypeFeesArgs extends ConnectionArgs {
  @Field(() => TicketTypeFeeWhereInput, { nullable: true })
  where?: TicketTypeFeeWhereInput;

  @Field(() => [TicketTypeFeeOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TicketTypeFeeOrderByWithRelationInput>;
}
