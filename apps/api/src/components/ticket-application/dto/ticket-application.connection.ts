import { ObjectType } from '@nestjs/graphql';
import { TicketApplication } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class TicketApplicationConnection extends Connection(
  TicketApplication,
) {}
