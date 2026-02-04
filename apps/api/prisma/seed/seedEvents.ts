import {
  PrismaClient,
  Venue,
  Artist,
  EventOrganizer,
  SeatType,
  TicketTransferPolicy,
  SaleSchedulePublishStatus,
  LotteryMode,
  SaleType,
  EventPublishStatus,
} from '../../src/generated/prisma/client';
import { faker } from '@faker-js/faker';

// イベント名のテンプレート
const eventNameTemplates = [
  'サマーフェスティバル',
  'ウィンターコンサート',
  'スプリングライブ',
  'オータムミュージックフェス',
  'ロックフェスティバル',
  'ジャズナイト',
  'クラシックコンサート',
  'アイドルライブ',
  'アニソンフェス',
  '夏の音楽祭',
  '年末カウントダウンライブ',
  'バレンタインコンサート',
  'ホワイトデーライブ',
  'ゴールデンウィークフェス',
  'シルバーウィークコンサート',
  'クリスマスライブ',
  '春の音楽祭',
  '秋の音楽祭',
  '冬の音楽祭',
  'ミュージックフェスティバル',
];

// チケットタイプのテンプレート
const ticketTypeTemplates = [
  {
    prefix: 'S',
    description: '最前列エリア',
    basePrice: 15000,
    seatType: SeatType.RESERVED,
  },
  {
    prefix: 'A',
    description: '前方エリア',
    basePrice: 10000,
    seatType: SeatType.RESERVED,
  },
  {
    prefix: 'B',
    description: '中央エリア',
    basePrice: 7000,
    seatType: SeatType.FREE,
  },
  {
    prefix: 'C',
    description: '一般エリア',
    basePrice: 5000,
    seatType: SeatType.FREE,
  },
  {
    prefix: 'D',
    description: '後方エリア',
    basePrice: 3000,
    seatType: SeatType.FREE,
  },
  {
    prefix: 'VIP',
    description: 'VIPエリア',
    basePrice: 20000,
    seatType: SeatType.RESERVED,
  },
  {
    prefix: '立ち見',
    description: '立ち見エリア',
    basePrice: 2000,
    seatType: SeatType.ENTRY_NUMBER,
  },
];

// ランダムな日付を生成（2026年1月〜12月）
function randomDate(month: number) {
  const year = 2026;
  const from = new Date(year, month - 1, 1, 17, 0, 0); // 月初の17時
  const to = new Date(year, month - 1, 28, 21, 30, 0); // 月末の21時30分
  return faker.date.between({ from, to });
}

export async function seedEvents(
  prisma: PrismaClient,
  venues: Venue[],
  artists: Artist[],
  eventOrganizer: EventOrganizer,
) {
  console.log('Seeding events...');

  // 100件のイベントを作成
  for (let i = 0; i < 100; i++) {
    const month = (i % 12) + 1; // 1-12月に分散
    const year = 2026;
    const eventNameBase = faker.helpers.arrayElement(eventNameTemplates);
    const eventName = `${eventNameBase} ${year} #${i + 1}`;

    // イベントの公演日
    const eventDate = randomDate(month);
    const doorsOpenAt = new Date(eventDate);
    doorsOpenAt.setMinutes(doorsOpenAt.getMinutes() - 60); // 1時間前に開場

    // ステージ数（1-3）
    const stageCount = faker.number.int({ min: 1, max: 3 });
    const stages = [];

    for (let s = 0; s < stageCount; s++) {
      const stageStartAt = new Date(eventDate);
      stageStartAt.setHours(stageStartAt.getHours() + s * 2); // 2時間ずつずらす

      const stageDoorsOpenAt = new Date(stageStartAt);
      stageDoorsOpenAt.setMinutes(stageDoorsOpenAt.getMinutes() - 60);

      // ステージごとに2-4人のアーティスト
      const stageArtistCount = faker.number.int({ min: 2, max: 4 });
      const stageArtists = faker.helpers.arrayElements(
        artists,
        stageArtistCount,
      );

      stages.push({
        name: stageCount > 1 ? `第${s + 1}部` : '',
        venue: {
          connect: {
            id: faker.helpers.arrayElement(venues).id,
          },
        },
        doorsOpenAt: stageDoorsOpenAt,
        startAt: stageStartAt,
        stageArtists: {
          create: stageArtists.map((artist, index) => ({
            artist: {
              connect: {
                id: artist.id,
              },
            },
            sortOrder: index,
          })),
        },
      });
    }

    // イベント作成
    const event = await prisma.event.create({
      data: {
        eventOrganizerId: eventOrganizer.id,
        name: eventName,
        description: `${eventName}の詳細情報\n\n${faker.lorem.paragraph()}\n\n${faker.lorem.sentences(2)}`,
        thumbnailUrls: [],
        publishStatus: faker.datatype.boolean(0.8)
          ? EventPublishStatus.PUBLISHED
          : EventPublishStatus.UNPUBLISHED, // 80%を公開
        isDisplayedInTop: i < 20, // 最初の20件をトップ表示
        inquiry: `03-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
        stages: {
          create: stages,
        },
      },
      include: {
        stages: true,
      },
    });

    // 販売スケジュール数（1-2）
    const saleScheduleCount = faker.number.int({ min: 1, max: 2 });

    for (let ss = 0; ss < saleScheduleCount; ss++) {
      const saleType = ss === 0 ? SaleType.LOTTERY : SaleType.FIRST_COME;
      const saleName = ss === 0 ? '先行抽選' : '一般販売';

      const saleStartAt = new Date(eventDate);
      saleStartAt.setDate(saleStartAt.getDate() - 30 - ss * 15); // イベントの30日前、45日前

      const saleEndAt = new Date(eventDate);
      saleEndAt.setDate(saleEndAt.getDate() - 7 - ss * 15); // イベントの7日前、22日前

      const publishAt = new Date(saleStartAt);
      publishAt.setDate(publishAt.getDate() - 7); // 販売開始の7日前に公開

      // 抽選の場合の設定
      const lotteryStartAt =
        saleType === 'LOTTERY'
          ? new Date(saleEndAt.getTime() + 24 * 60 * 60 * 1000)
          : null;
      const lotteryResultAnnounceAt = lotteryStartAt
        ? new Date(lotteryStartAt.getTime() + 3 * 60 * 60 * 1000)
        : null;

      // チケットタイプ数（2-5）
      const ticketTypeCount = faker.number.int({ min: 2, max: 5 });
      const selectedTicketTypes = faker.helpers.arrayElements(
        ticketTypeTemplates,
        ticketTypeCount,
      );

      await prisma.saleSchedule.create({
        data: {
          eventId: event.id,
          name: saleName,
          description: `${saleName}の説明`,
          saleType,
          publishStatus: SaleSchedulePublishStatus.PUBLISHED,
          publishAt,
          saleStartAt,
          saleEndAt,
          lotteryMode:
            saleType === SaleType.LOTTERY ? LotteryMode.MANUAL : null,
          lotteryStartAt,
          lotteryResultAnnounceAt,
          sortOrder: ss,
          transferPolicy: TicketTransferPolicy.FREE,
          maxPerApplication: faker.number.int({ min: 2, max: 6 }),
          isSmsAuthRequired: faker.datatype.boolean(),
          ticketTypes: {
            create: selectedTicketTypes.map((template, index) => ({
              name: `${template.prefix}席`,
              description: template.description,
              basePrice: template.basePrice,
              capacity: faker.number.int({ min: 500, max: 1500 }),
              maxNumPerApply: faker.number.int({ min: 2, max: 6 }),
              sortOrder: index,
              seatType: template.seatType,
              stageTicketTypes: {
                create: stages.map((_, stageIndex) => ({
                  stage: {
                    connect: {
                      id: event.stages[stageIndex]!.id,
                    },
                  },
                })),
              },
            })),
          },
        },
      });
    }

    if ((i + 1) % 10 === 0) {
      console.log(`Created ${i + 1} events...`);
    }
  }

  console.log(
    'Successfully created 100 events with stages, sale schedules, and ticket types!',
  );
}
