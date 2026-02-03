import { Field, ID, InputType } from '@nestjs/graphql';
import { SaleType, LotteryMode } from 'src/generated/prisma-nestjs-graphql';

@InputType()
export class SaleScheduleCreateInput {
  @Field(() => ID)
  eventId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => SaleType)
  saleType!: SaleType;

  @Field(() => Date)
  publishAt!: Date;

  @Field(() => Date)
  saleStartAt!: Date;

  @Field(() => Date)
  saleEndAt!: Date;

  @Field(() => LotteryMode, { nullable: true })
  lotteryMode?: LotteryMode;

  @Field(() => Date, { nullable: true })
  lotteryStartAt?: Date;

  @Field(() => Date, { nullable: true })
  lotteryResultAnnounceAt?: Date;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isSmsAuthRequired?: boolean;
}
