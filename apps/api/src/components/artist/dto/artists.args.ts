import { ArgsType, Field } from '@nestjs/graphql';
import {
  ArtistOrderByWithRelationInput,
  ArtistWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class ArtistsArgs extends ConnectionArgs {
  @Field(() => ArtistWhereInput, { nullable: true })
  where?: ArtistWhereInput;

  @Field(() => [ArtistOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ArtistOrderByWithRelationInput>;
}
