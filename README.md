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

# データベースサーバーを起動（事前にDocker を入れておく必要があります）

pnpm db:up

# apps/server/.env にデータベースサーバーの接続先を記載

# prisma スキーマをデータベースに反映

pnpm db:push

# prismaクライアントを作成
pnpm db:generate

# apiサーバーの環境変数を設定しましょう

apps/api/.env.example

# 開発サーバー(バックエンド、フロントエンド両方)を起動

pnpm dev

```

バックエンド → http://localhost:4020
フロントエンド → http://localhost:4021

バックエンドとフロントエンドを個別に起動したい場合は以下を実行

```

pnpm dev:server # バックエンド
pnpm dev:web # フロントエンド

```

## データベースの中身をチェックしたり操作したりしたい場合

```

# 以下のコマンドを実行して、指定された localhost の url を開いてください

# ブラウザで DB を GUI 上で直観的に見たり操作したりできます

pnpm db:studio

```

[参照](https://www.prisma.io/studio)

[Table plus](https://envader.plus/article/119) というツールを使うのも便利です！
