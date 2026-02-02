import { ObjectType } from '@nestjs/graphql';
import { Verification } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class VerificationConnection extends Connection(Verification) {}
