import { ObjectType } from '@nestjs/graphql';
import { Session } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class SessionConnection extends Connection(Session) {}
