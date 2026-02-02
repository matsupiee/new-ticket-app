import { ObjectType } from '@nestjs/graphql';
import { UserRestriction } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class UserRestrictionConnection extends Connection(UserRestriction) {}
