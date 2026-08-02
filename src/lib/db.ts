// Database client placeholder
// Prisma client will be available after running:
// 1. Set DATABASE_URL in .env
// 2. npx prisma generate
// 3. npx prisma db push

// For now, we export a placeholder that will be replaced
// once the database is configured

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PrismaClientModule: any;

try {
  PrismaClientModule = require('@prisma/client').PrismaClient;
} catch {
  // Prisma client not generated yet — using a placeholder
  PrismaClientModule = class PrismaClientPlaceholder {
    constructor() {
      console.warn(
        '⚠️ PrismaClient not generated. Run `npx prisma generate` after setting DATABASE_URL.'
      );
    }
  };
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: InstanceType<typeof PrismaClientModule> | undefined;
}

export const db = globalThis.prisma || new PrismaClientModule();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
