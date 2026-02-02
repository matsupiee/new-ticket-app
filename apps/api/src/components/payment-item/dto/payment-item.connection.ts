import { ObjectType } from '@nestjs/graphql';
import { PaymentItem } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class PaymentItemConnection extends Connection(PaymentItem) {}
