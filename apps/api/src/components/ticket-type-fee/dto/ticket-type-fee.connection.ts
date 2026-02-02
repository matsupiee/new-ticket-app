import { ObjectType } from '@nestjs/graphql';
import { TicketTypeFee } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class TicketTypeFeeConnection extends Connection(TicketTypeFee) {}
