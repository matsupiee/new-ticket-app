import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { SeatType } from 'src/generated/prisma-nestjs-graphql';

@InputType()
export class TicketTypeCreateInput {
  @Field(() => ID)
  saleScheduleId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  description?: string;

  @Field(() => SeatType, { nullable: true, defaultValue: 'FREE' })
  seatType?: SeatType;

  @Field(() => Int)
  basePrice!: number;

  @Field(() => Int)
  capacity!: number;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  maxNumPerApply?: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isOnceApplyOnly?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isOnlyQrCodeEntry?: boolean;
}
