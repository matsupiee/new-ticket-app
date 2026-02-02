import { ObjectType } from '@nestjs/graphql';
import { SaleSchedule } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class SaleScheduleConnection extends Connection(SaleSchedule) {}
