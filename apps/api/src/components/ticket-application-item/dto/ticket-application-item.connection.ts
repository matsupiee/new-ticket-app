import { ObjectType } from '@nestjs/graphql';
import { TicketApplicationItem } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class TicketApplicationItemConnection extends Connection(
  TicketApplicationItem,
) {}
