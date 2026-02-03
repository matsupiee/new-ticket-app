import { exec } from 'child_process';
import util from 'util';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeAll, afterAll } from 'vitest';

import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { AppModule } from 'src/app.module';

const tmpDbUrl = 'postgresql://postgres:password@localhost:55441/db';
if (!tmpDbUrl) {
  throw new Error('The databaseUrl is not found');
}

export let testModule: TestingModule;
const EXEC = util.promisify(exec);

beforeAll(async () => {
  const pool = new PrismaPg({
    connectionString: tmpDbUrl,
  });
  const prismaClient = new PrismaClient({
    adapter: pool,
  });

  /**
   * テスト開始前に、テスト用DBを初期化する。
   *
   * 各テストファイル開始前に毎回`prisma migrate reset`を実行するという方法にするとテスト実行時間が長くなってしまう。
   * マイグレーション状況をチェックして問題がある場合だけ`prisma migrate reset`を実行し、
   * 問題ない場合はデータ削除だけを実行するという方法にすることで、テスト時間を短縮できる。
   */
  try {
    await checkPrismaMigrateStatus();
    await truncate(prismaClient);
  } catch {
    await prismaMigrateReset();
  }

  // 初期化のためのDB操作ここまで。Prisma Client の接続を切る。
  await prismaClient.$disconnect();

  testModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    // コンパイルを実行
    .compile();
}, 100 * 1000);

afterAll(async () => {
  await testModule.close(); // 明示的にアプリを終了させる
}, 100 * 1000);

// DBに存在するデータを全て削除する
const truncate = async (prismaClient: PrismaClient) => {
  // publicスキーマの全テーブルを取得
  const tables = await prismaClient.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
  `;

  if (tables.length > 0) {
    await prismaClient.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables.map((t) => `"${t.tablename}"`).join(', ')} CASCADE;`,
    );
  }
};

const checkPrismaMigrateStatus = async () => {
  await EXEC('pnpm prisma migrate reset --force --skip-seed --skip-generate ', {
    env: process.env, // 明示的にprocess.envを渡してあげないと更新されない
  });
};

const prismaMigrateReset = async () => {
  console.log('Resetting prisma migration');
  await EXEC('pnpm prisma migrate status', {
    env: process.env, // 明示的にprocess.envを渡してあげないと更新されない
  });
  console.log('Prisma migration reset completed');
};
