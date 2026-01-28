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
      email: 'user1@example.com',
      name: 'ユーザー1',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'ユーザー2',
    },
  });

  console.log('Created users:', { user1, user2 });

  // イベントの作成
  const event1 = await prisma.event.upsert({
    where: { id: 'event1' },
    update: {},
    create: {
      id: 'event1',
      title: 'サマーコンサート2024',
      description: '夏の音楽フェスティバル',
      venue: '東京ドーム',
      date: new Date('2024-08-15T18:00:00Z'),
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: 'event2' },
    update: {},
    create: {
      id: 'event2',
      title: 'ジャズナイト',
      description: 'ジャズの夜',
      venue: 'ブルーノート東京',
      date: new Date('2024-09-20T19:00:00Z'),
    },
  });

  console.log('Created events:', { event1, event2 });

  // チケットの作成
  const ticket1 = await prisma.ticket.upsert({
    where: { id: 'ticket1' },
    update: {},
    create: {
      id: 'ticket1',
      eventId: event1.id,
      name: '一般席',
      price: 5000,
      stock: 100,
    },
  });

  const ticket2 = await prisma.ticket.upsert({
    where: { id: 'ticket2' },
    update: {},
    create: {
      id: 'ticket2',
      eventId: event1.id,
      name: 'VIP席',
      price: 15000,
      stock: 20,
    },
  });

  const ticket3 = await prisma.ticket.upsert({
    where: { id: 'ticket3' },
    update: {},
    create: {
      id: 'ticket3',
      eventId: event2.id,
      name: '一般席',
      price: 8000,
      stock: 50,
    },
  });

  console.log('Created tickets:', { ticket1, ticket2, ticket3 });

  // 注文の作成
  const order1 = await prisma.order.upsert({
    where: { id: 'order1' },
    update: {},
    create: {
      id: 'order1',
      userId: user1.id,
      totalPrice: 10000,
      status: 'COMPLETED',
      items: {
        create: [
          {
            ticketId: ticket1.id,
            quantity: 2,
            unitPrice: 5000,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.upsert({
    where: { id: 'order2' },
    update: {},
    create: {
      id: 'order2',
      userId: user2.id,
      totalPrice: 15000,
      status: 'PENDING',
      items: {
        create: [
          {
            ticketId: ticket2.id,
            quantity: 1,
            unitPrice: 15000,
          },
        ],
      },
    },
  });

  console.log('Created orders:', { order1, order2 });

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
