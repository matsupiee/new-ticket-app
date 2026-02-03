import { faker } from '@faker-js/faker';
import { EventService } from './event.service';
import { PrismaClient } from 'src/generated/prisma/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { testModule } from 'test/vitest.setup';
import { PrismaService } from '../prisma/prisma.service';

describe('EventService', () => {
  let eventService: EventService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    eventService = testModule.get(EventService);
    prisma = testModule.get(PrismaService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('イベントを作成できる', async () => {
      // Arrange
      const user = await prisma.user.create({
        data: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          emailVerified: false,
        },
      });
      const eventOrganizer = await prisma.eventOrganizer.create({
        data: {
          userId: user.id,
          name: faker.person.fullName(),
          inquiryEmail: faker.internet.email(),
          inquirySubject: faker.lorem.sentence(),
        },
      });

      // Act
      const result = await eventService.create({
        name: '天下一舞闘会！！其の三',
        description: '※ ライブ当日は、係員の誘導・指示に従って下さい。',
        inquiry: '03-1234-5678',
        thumbnailUrls: ['https://example.com/thumbnail.jpg'],
        lineThumbnailUrl: 'https://example.com/line-thumbnail.jpg',
        eventOrganizerId: eventOrganizer.id,
        stages: [
          {
            name: 'メインステージ',
            venueName: 'サンプルホール',
            artistNames: ['サンプルアーティスト'],
            doorsOpenAt: new Date('2026-01-18T18:00:00'),
            startAt: new Date('2026-01-18T19:00:00'),
          },
        ],
      });

      // Assert
      const event = await prisma.event.findUnique({
        where: {
          id: result.id,
        },
        include: {
          stages: {
            include: {
              venue: true,
              stageArtists: {
                include: {
                  artist: true,
                },
              },
            },
          },
        },
      });
      expect(event.id).toBeDefined();
      expect(event.name).toBe('天下一舞闘会！！其の三');
      expect(event.description).toBe(
        '※ ライブ当日は、係員の誘導・指示に従って下さい。',
      );
      expect(event.inquiry).toBe('03-1234-5678');
      expect(event.thumbnailUrls).toContainEqual(
        'https://example.com/thumbnail.jpg',
      );
      expect(event.lineThumbnailUrl).toBe(
        'https://example.com/line-thumbnail.jpg',
      );
      expect(event.eventOrganizerId).toBe(eventOrganizer.id);
      expect(event.stages).toHaveLength(1);
      expect(event.stages[0].name).toBe('メインステージ');
      expect(event.stages[0].venue.name).toBe('サンプルホール');
      expect(event.stages[0].stageArtists).toHaveLength(1);
      expect(event.stages[0].stageArtists[0].artist.name).toBe(
        'サンプルアーティスト',
      );
      expect(event.stages[0].doorsOpenAt).toStrictEqual(
        new Date('2026-01-18T18:00:00'),
      );
      expect(event.stages[0].startAt).toStrictEqual(
        new Date('2026-01-18T19:00:00'),
      );
    });
  });
});
