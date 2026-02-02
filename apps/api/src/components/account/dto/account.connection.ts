import { ObjectType } from '@nestjs/graphql';
import { Account } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class AccountConnection extends Connection(Account) {}
