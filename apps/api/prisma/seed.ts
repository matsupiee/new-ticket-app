import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // ユーザーの作成
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      id: 'user1',
      email: 'user1@example.com',
      name: 'ユーザー1',
      emailVerified: false,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      id: 'user2',
      email: 'user2@example.com',
      name: 'ユーザー2',
      emailVerified: false,
    },
  });

  const organizerUser = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {},
    create: {
      id: 'organizer1',
      email: 'organizer@example.com',
      name: 'イベント主催者',
      emailVerified: false,
      role: 'EVENT_ORGANIZER',
    },
  });

  console.log('Created users:', { user1, user2, organizerUser });

  // イベント主催者の作成
  const eventOrganizer1 = await prisma.eventOrganizer.create({
    data: {
      userId: organizerUser.id,
      name: 'サマーコンサート主催者',
      inquiryEmail: 'inquiry1@example.com',
      inquirySubject: 'サマーコンサート2024に関するお問い合わせ',
    },
  });

  const eventOrganizer2 = await prisma.eventOrganizer.create({
    data: {
      userId: organizerUser.id,
      name: 'ジャズナイト主催者',
      inquiryEmail: 'inquiry2@example.com',
      inquirySubject: 'ジャズナイトに関するお問い合わせ',
    },
  });

  console.log('Created event organizers:', {
    eventOrganizer1,
    eventOrganizer2,
  });

  // 会場の作成
  const venue1 = await prisma.venue.upsert({
    where: { id: 'venue1' },
    update: {},
    create: {
      id: 'venue1',
      name: '東京ドーム',
    },
  });

  const venue2 = await prisma.venue.upsert({
    where: { id: 'venue2' },
    update: {},
    create: {
      id: 'venue2',
      name: 'ゾンネンハイム渋谷',
    },
  });

  console.log('Created venues:', { venue1, venue2 });

  // アーティストの作成
  const artist1 = await prisma.artist.upsert({
    where: { id: 'artist1' },
    update: {},
    create: {
      id: 'artist1',
      name: 'アーティストA',
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { id: 'artist2' },
    update: {},
    create: {
      id: 'artist2',
      name: 'アーティストB',
    },
  });

  const artist3 = await prisma.artist.upsert({
    where: { id: 'artist3' },
    update: {},
    create: {
      id: 'artist3',
      name: 'pa',
    },
  });

  console.log('Created artists:', { artist1, artist2, artist3 });

  // イベントの作成
  const event1 = await prisma.event.create({
    data: {
      eventOrganizerId: eventOrganizer1.id,
      name: 'サマーコンサート2024',
      description:
        '夏の音楽フェスティバル\n\n人気アーティストが集結する夏の一大イベント！',
      thumbnailUrls: [],
      publishStatus: 'PUBLISHED',
      isDisplayedInTop: true,
      inquiry: '03-1234-5678',
      stages: {
        create: [
          {
            name: '第1部',
            venueId: venue1.id,
            doorsOpenAt: new Date('2024-07-15T18:00:00'),
            startAt: new Date('2024-07-15T19:00:00'),
            stageArtists: {
              create: [
                {
                  artistId: artist1.id,
                  sortOrder: 0,
                },
                {
                  artistId: artist2.id,
                  sortOrder: 1,
                },
              ],
            },
          },
          {
            name: '第2部',
            venueId: venue1.id,
            doorsOpenAt: new Date('2024-07-15T20:00:00'),
            startAt: new Date('2024-07-15T21:00:00'),
            stageArtists: {
              create: [
                {
                  artistId: artist2.id,
                  sortOrder: 0,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const event2 = await prisma.event.create({
    data: {
      eventOrganizerId: eventOrganizer2.id,
      name: 'ジャズナイト',
      description: 'ジャズの夜\n\n本格的なジャズライブをお楽しみください。',
      thumbnailUrls: [],
      publishStatus: 'PUBLISHED',
      isDisplayedInTop: true,
      inquiry: '03-1234-5678',
      stages: {
        create: [
          {
            name: '',
            venueId: venue2.id,
            doorsOpenAt: new Date('2026-01-18T18:30:00'),
            startAt: new Date('2026-01-18T19:00:00'),
            stageArtists: {
              create: [
                {
                  artistId: artist3.id,
                  sortOrder: 0,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Created events:', { event1, event2 });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
