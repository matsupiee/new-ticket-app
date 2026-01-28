import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class UserConnection extends Connection(User) {}
