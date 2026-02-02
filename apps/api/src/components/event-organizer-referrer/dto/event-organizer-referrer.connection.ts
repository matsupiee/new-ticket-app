import { ObjectType } from '@nestjs/graphql';
import { EventOrganizerReferrer } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class EventOrganizerReferrerConnection extends Connection(
  EventOrganizerReferrer,
) {}
