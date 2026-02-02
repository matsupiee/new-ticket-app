import { ObjectType } from '@nestjs/graphql';
import { Stage } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class StageConnection extends Connection(Stage) {}
