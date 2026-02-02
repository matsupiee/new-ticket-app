import { ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class PaymentConnection extends Connection(Payment) {}
