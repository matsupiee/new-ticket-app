## スタック

データベース

- PostgreSQL — データベースエンジン

バックエンド

- Prisma — DB スキーマの定義 & 柔軟な ORM 機能
- Nestjs — 軽量で高速なサーバーフレームワーク
- GraphQL -

フロント

- Nextjs
- TailwindCSS — 迅速な UI 開発のためのユーティリティ CSS
- shadcn/ui — 再利用可能 UI コンポーネント

プロジェクト管理

- Turborepo — モノレポ最適化ビルド

## ディレクトリ構成

```
new-ticket-app/
├── apps/
│   ├── api/         # バックエンド API
│   └── web/         # フロントエンド
├── packages/
│   ├── eslint-config/
│   └── typescript-config/
```

## monorepo 構成について

apps で共通利用できるものは packages として切り出しています

例：apps/web から packages を利用する際は apps/web/package.json に以下のように書きます

```
"dependencies": {
  "@repo/eslint-config": "workspace:*",  // ワークスペース内のパッケージ
}
```

また、pnpm-workspace.yaml を使って、複数の packages や app で使うパッケージのバージョンを一元管理します

```
# pnpm-workspace.yaml
packages:
  - apps/*
  - packages/*
catalog:
  dotenv: ^17.2.2

↓

# package.json
"dependencies": {
  "dotenv": "catalog:",
}
```

## 開発の始め方

```

# mise というバージョン管理ツールを導入
# miseについてより詳しく知りたい方は[公式 docs](https://mise.jdx.dev/getting-started.html#quickstart)を参照

brew install mise
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
mise install

# 依存関係のインストール

pnpm install

# データベースサーバーを起動（Docker を入れる必要があります）

pnpm db:up

# apps/server/.env にデータベースサーバーの接続先を記載

# prisma スキーマをデータベースに反映

pnpm db:push

# 開発サーバー(バックエンド、フロントエンド両方)を起動

pnpm dev

```

バックエンド → http://localhost:3070
フロントエンド → http://localhost:3071

バックエンドとフロントエンドを個別に起動したい場合は以下を実行

```

pnpm dev:server # バックエンド
pnpm dev:web # フロントエンド

```

## リント&フォーマット

```

# Oxlint と Oxfmt を実行

pnpm check

# アプリ全体の型をチェック

pnpm check-types

```

## データベースの中身をチェックしたり操作したりしたい場合

```

# 以下のコマンドを実行して、指定された localhost の url を開いてください

# ブラウザで DB を GUI 上で直観的に見たり操作したりできます

pnpm db:studio

```

[参照](https://www.prisma.io/studio)

[Table plus](https://envader.plus/article/119) というツールを使うのも便利です！

```

```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
npx turbo link
```

## Useful Links

This example take some inspiration the [with-nextjs](https://github.com/vercel/turborepo/tree/main/examples/with-nextjs) `Turbo` example and [01-cats-app](https://github.com/nestjs/nest/tree/master/sample/01-cats-app) `NestJs` sample.

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
