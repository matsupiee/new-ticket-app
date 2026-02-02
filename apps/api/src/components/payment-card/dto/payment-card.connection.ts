import { ObjectType } from '@nestjs/graphql';
import { PaymentCard } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class PaymentCardConnection extends Connection(PaymentCard) {}
