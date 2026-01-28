import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TicketCreateInput {
  @Field(() => String)
  eventId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  price!: number;

  @Field(() => Int)
  stock!: number;
}
