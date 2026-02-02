import { ArgsType, Field } from '@nestjs/graphql';
import {
  TicketApplicationItemOrderByWithRelationInput,
  TicketApplicationItemWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class TicketApplicationItemsArgs extends ConnectionArgs {
  @Field(() => TicketApplicationItemWhereInput, { nullable: true })
  where?: TicketApplicationItemWhereInput;

  @Field(() => [TicketApplicationItemOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: Array<TicketApplicationItemOrderByWithRelationInput>;
}
