import { Field, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class TicketCreatePayload {
  @Field(() => Ticket)
  ticket!: Ticket;
}
