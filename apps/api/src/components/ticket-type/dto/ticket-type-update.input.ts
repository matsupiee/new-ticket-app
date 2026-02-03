import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { SeatType } from 'src/generated/prisma-nestjs-graphql';

@InputType()
export class TicketTypeUpdateInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => SeatType, { nullable: true })
  seatType?: SeatType;

  @Field(() => Int, { nullable: true })
  basePrice?: number;

  @Field(() => Int, { nullable: true })
  capacity?: number;

  @Field(() => Int, { nullable: true })
  maxNumPerApply?: number;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;

  @Field(() => Boolean, { nullable: true })
  isOnceApplyOnly?: boolean;

  @Field(() => Boolean, { nullable: true })
  isOnlyQrCodeEntry?: boolean;
}
