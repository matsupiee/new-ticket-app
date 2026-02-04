import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserRole } from '../src/generated/prisma/client';
import { seedVenues } from './seed/seedVenues';
import { seedArtists } from './seed/seedArtists';
import { seedEvents } from './seed/seedEvents';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 一般ユーザーの作成
  await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      id: 'user1',
      email: 'user1@example.com',
      name: 'ユーザー1',
      emailVerified: false,
      role: UserRole.TICKET_PURCHASER,
    },
  });
  await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      id: 'user2',
      email: 'user2@example.com',
      name: 'ユーザー2',
      emailVerified: false,
      role: UserRole.TICKET_PURCHASER,
    },
  });

  // イベント主催者の作成
  const organizerUser = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {},
    create: {
      id: 'organizer1',
      email: 'organizer@example.com',
      name: 'イベント主催者',
      emailVerified: false,
      role: UserRole.EVENT_ORGANIZER,
    },
  });
  const eventOrganizer1 = await prisma.eventOrganizer.create({
    data: {
      userId: organizerUser.id,
      name: 'サマーコンサート主催者',
      inquiryEmail: 'inquiry1@example.com',
      inquirySubject: 'サマーコンサート2024に関するお問い合わせ',
    },
  });

  // 会場の作成
  const venues = await seedVenues(prisma);
  // アーティストの作成
  const artists = await seedArtists(prisma);
  // イベントの作成
  await seedEvents(prisma, venues, artists, eventOrganizer1);

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
