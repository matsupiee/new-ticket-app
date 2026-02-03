import { Field, ID, InputType } from '@nestjs/graphql';
import { SaleType, LotteryMode } from 'src/generated/prisma-nestjs-graphql';

@InputType()
export class SaleScheduleUpdateInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => SaleType, { nullable: true })
  saleType?: SaleType;

  @Field(() => Date, { nullable: true })
  publishAt?: Date;

  @Field(() => Date, { nullable: true })
  saleStartAt?: Date;

  @Field(() => Date, { nullable: true })
  saleEndAt?: Date;

  @Field(() => LotteryMode, { nullable: true })
  lotteryMode?: LotteryMode;

  @Field(() => Date, { nullable: true })
  lotteryStartAt?: Date;

  @Field(() => Date, { nullable: true })
  lotteryResultAnnounceAt?: Date;

  @Field(() => Boolean, { nullable: true })
  isSmsAuthRequired?: boolean;
}
