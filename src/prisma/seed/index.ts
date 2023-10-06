import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { seedPerms } from './perms';
import { seedUsers } from './users';

async function main() {
  // Seed perms
  await seedPerms(prisma);
  await seedUsers(prisma);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
