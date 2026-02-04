import { PrismaClient, Venue } from '../../src/generated/prisma/client';

// 会場名のテンプレート
const venueNames = [
  '東京ドーム',
  '大阪ドーム',
  '名古屋ドーム',
  '福岡ドーム',
  '札幌ドーム',
  '日本武道館',
  '横浜アリーナ',
  'さいたまスーパーアリーナ',
  '大阪城ホール',
  'マリンメッセ福岡',
  'ゾンネンハイム渋谷',
  'Zepp Tokyo',
  'Zepp Osaka',
  'ビルボードライブ東京',
  'ビルボードライブ大阪',
  'ブルーノート東京',
  'コットンクラブ',
  'CLUB QUATTRO',
  'LIQUIDROOM',
  'WWW',
];

export async function seedVenues(prisma: PrismaClient): Promise<Venue[]> {
  console.log('Seeding venues...');

  const venues = await Promise.all(
    venueNames.map((name, index) =>
      prisma.venue.upsert({
        where: { id: `venue_${index + 1}` },
        update: {},
        create: {
          id: `venue_${index + 1}`,
          name,
        },
      }),
    ),
  );

  console.log(`Created ${venues.length} venues`);
  return venues;
}
