import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TicketUpdateInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  stock?: number;
}
