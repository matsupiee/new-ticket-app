import { Module } from '@nestjs/common';
import { SaleScheduleResolver } from './sale-schedule.resolver';
import { SaleScheduleService } from './sale-schedule.service';

@Module({
  providers: [SaleScheduleResolver, SaleScheduleService],
})
export class SaleScheduleModule {}
