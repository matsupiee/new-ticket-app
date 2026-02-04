import { PrismaClient, Artist } from '../../src/generated/prisma/client';
import { faker } from '@faker-js/faker';

// アーティスト名の生成関数
function generateArtistName(): string {
  const types = [
    () =>
      `${faker.person.firstName()}${faker.helpers.arrayElement(['バンド', 'グループ', ''])}`,
    () =>
      `${faker.music.genre()} ${faker.helpers.arrayElement(['アンサンブル', 'バンド', 'オーケストラ'])}`,
    () => `DJ ${faker.person.firstName()}`,
    () => faker.music.songName(),
  ];
  return faker.helpers.arrayElement(types)();
}

export async function seedArtists(prisma: PrismaClient): Promise<Artist[]> {
  console.log('Seeding artists...');

  // アーティストを作成（50人）
  const artists = await Promise.all(
    Array.from({ length: 50 }, (_, index) =>
      prisma.artist.upsert({
        where: { id: `artist_${index + 1}` },
        update: {},
        create: {
          id: `artist_${index + 1}`,
          name: generateArtistName(),
        },
      }),
    ),
  );

  console.log(`Created ${artists.length} artists`);
  return artists;
}
