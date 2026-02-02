import { ObjectType } from '@nestjs/graphql';
import { EventOrganizerFeature } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class EventOrganizerFeatureConnection extends Connection(
  EventOrganizerFeature,
) {}
