import { ObjectType } from '@nestjs/graphql';
import { EventOrganizer } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class EventOrganizerConnection extends Connection(EventOrganizer) {}
