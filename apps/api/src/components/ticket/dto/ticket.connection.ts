import { ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class TicketConnection extends Connection(Ticket) {}
