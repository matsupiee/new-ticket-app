import { ObjectType } from '@nestjs/graphql';
import { StageGroup } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class StageGroupConnection extends Connection(StageGroup) {}
