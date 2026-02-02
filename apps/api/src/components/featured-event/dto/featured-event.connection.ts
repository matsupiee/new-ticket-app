import { ObjectType } from '@nestjs/graphql';
import { FeaturedEvent } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class FeaturedEventConnection extends Connection(FeaturedEvent) {}
