import { ObjectType } from '@nestjs/graphql';
import { TicketType } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class TicketTypeConnection extends Connection(TicketType) {}
