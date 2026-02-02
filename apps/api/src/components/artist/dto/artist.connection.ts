import { ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/generated/prisma-nestjs-graphql';

import { Connection } from 'src/libs/graphql/interfaces/connection';

@ObjectType()
export class ArtistConnection extends Connection(Artist) {}
