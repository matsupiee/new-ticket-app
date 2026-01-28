import { Field, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class TicketUpdatePayload {
  @Field(() => Ticket)
  ticket!: Ticket;
}
