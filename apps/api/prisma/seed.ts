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

  // イベントの作成
  const event1 = await prisma.event.create({
    data: {
      eventOrganizerId: eventOrganizer1.id,
      name: 'サマーコンサート2024',
      description:
        '夏の音楽フェスティバル\n\n人気アーティストが集結する夏の一大イベント！',
      thumbnailUrls: [],
      startAt: new Date('2024-08-15T18:00:00Z'),
      endAt: new Date('2024-08-15T22:00:00Z'),
      publishStatus: 'PUBLISHED',
      isDisplayedInTop: true,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      eventOrganizerId: eventOrganizer2.id,
      name: 'ジャズナイト',
      description: 'ジャズの夜\n\n本格的なジャズライブをお楽しみください。',
      thumbnailUrls: [],
      startAt: new Date('2024-09-20T19:00:00Z'),
      endAt: new Date('2024-09-20T22:00:00Z'),
      publishStatus: 'PUBLISHED',
      isDisplayedInTop: true,
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
