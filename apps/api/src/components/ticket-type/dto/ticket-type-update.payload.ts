import { Field, ObjectType } from '@nestjs/graphql';
import { TicketType } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class TicketTypeUpdatePayload {
  @Field(() => TicketType)
  ticketType!: TicketType;
}
