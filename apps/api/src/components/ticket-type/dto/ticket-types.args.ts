import { ArgsType, Field } from '@nestjs/graphql';
import {
  TicketTypeOrderByWithRelationInput,
  TicketTypeWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class TicketTypesArgs extends ConnectionArgs {
  @Field(() => TicketTypeWhereInput, { nullable: true })
  where?: TicketTypeWhereInput;

  @Field(() => [TicketTypeOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TicketTypeOrderByWithRelationInput>;
}
