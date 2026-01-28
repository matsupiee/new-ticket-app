import path from 'node:path';
import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

dotenv.config({ path: path.join(import.meta.dirname, '../.env') });

export default defineConfig({
  earlyAccess: true,
  schema: path.join(import.meta.dirname, 'schema.prisma'),
  migrate: {
    async url() {
      return (
        process.env.DATABASE_URL ??
        'postgresql://postgres:password@localhost:55440/db?schema=public'
      );
    },
  },
});
