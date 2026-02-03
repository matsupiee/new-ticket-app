import { Field, ObjectType } from '@nestjs/graphql';
import { TicketType } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class TicketTypeCreatePayload {
  @Field(() => TicketType)
  ticketType!: TicketType;
}
