import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class ArtistCreatePayload {
  @Field(() => Artist)
  artist!: Artist;
}
