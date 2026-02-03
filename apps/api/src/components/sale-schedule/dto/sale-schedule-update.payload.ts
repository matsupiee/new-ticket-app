import { Field, ObjectType } from '@nestjs/graphql';
import { SaleSchedule } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class SaleScheduleUpdatePayload {
  @Field(() => SaleSchedule)
  saleSchedule!: SaleSchedule;
}
