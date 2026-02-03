import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Event } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { EventsArgs } from './dto/events.args';
import { EventCreateInput } from './dto/event-create.input';
import { EventUpdateInput } from './dto/event-update.input';
import { EventUpdatePublishStatusInput } from './dto/event-update-publish-status.input';
import { EventConnection } from './dto/event.connection';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: EventsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<EventConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.event.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.event.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }

  async create(input: EventCreateInput): Promise<Event> {
    // イベントを作成
    const event = await this.prisma.event.create({
      data: {
        name: input.name,
        description: input.description,
        inquiry: input.inquiry,
        thumbnailUrls: input.thumbnailUrls || [],
        lineThumbnailUrl: input.lineThumbnailUrl,
        eventOrganizerId: input.eventOrganizerId,
        stages: {
          create: await Promise.all(
            input.stages.map(async (stage) => {
              // 会場を取得または作成
              let venue: { id: string } | null = null;
              if (stage.venueName) {
                venue = await this.prisma.venue.findFirst({
                  where: { name: stage.venueName },
                });
                if (!venue) {
                  venue = await this.prisma.venue.create({
                    data: { name: stage.venueName },
                  });
                }
              }

              // アーティストを取得または作成
              const artists = await Promise.all(
                stage.artistNames
                  .filter((name) => name.trim() !== '')
                  .map(async (artistName) => {
                    let artist = await this.prisma.artist.findFirst({
                      where: { name: artistName },
                    });
                    if (!artist) {
                      artist = await this.prisma.artist.create({
                        data: { name: artistName },
                      });
                    }
                    return artist;
                  }),
              );

              return {
                name: stage.name,
                doorsOpenAt: stage.doorsOpenAt,
                startAt: stage.startAt,
                venueId: venue?.id,
                stageArtists: {
                  create: artists.map((artist, index) => ({
                    artistId: artist.id,
                    sortOrder: index,
                  })),
                },
              };
            }),
          ),
        },
      },
    });

    return event;
  }

  async update(input: EventUpdateInput): Promise<Event> {
    const updateData: any = {};

    if (input.name !== undefined) {
      updateData.name = input.name;
    }
    if (input.description !== undefined) {
      updateData.description = input.description;
    }
    if (input.thumbnailUrls !== undefined) {
      updateData.thumbnailUrls = input.thumbnailUrls;
    }
    if (input.lineThumbnailUrl !== undefined) {
      updateData.lineThumbnailUrl = input.lineThumbnailUrl;
    }
    if (input.inquiry !== undefined) {
      updateData.inquiry = input.inquiry;
    }

    return this.prisma.event.update({
      where: { id: input.id },
      data: updateData,
    });
  }

  async updatePublishStatus(
    input: EventUpdatePublishStatusInput,
  ): Promise<Event> {
    return this.prisma.event.update({
      where: { id: input.id },
      data: { publishStatus: input.publishStatus },
    });
  }

  async delete(id: string): Promise<Event> {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
