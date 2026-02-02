import { ObjectType } from '@nestjs/graphql';
import { AvailablePaymentMethod } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class AvailablePaymentMethodConnection extends Connection(
  AvailablePaymentMethod,
) {}
