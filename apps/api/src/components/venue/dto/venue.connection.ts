import { ObjectType } from '@nestjs/graphql';
import { Venue } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class VenueConnection extends Connection(Venue) {}
