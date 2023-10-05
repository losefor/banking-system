import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  const bank = await prisma.bank.create({
    data: {
      name: 'AL-Rafidain Bank',
    },
  });

  // Your seed data goes here
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      address: 'Al-bayaa',
      fullName: 'Admin',
      permission: {
        create: {
          uniqueName: 'ADMIN',
          name: {
            create: {
              en: 'Admin',
              ar: 'ادمن',
              ckb: 'ادمن',
            },
          },
          Image: 'crud',
        },
      },
      username: 'admin',
      bank: { connect: { id: bank.id } },
      password: await bcrypt.hash('password', 12),
    },
  });

  // Your seed data goes here
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      address: 'Al-bayaa',
      fullName: 'Mohammed Paqer',
      permission: {
        create: {
          uniqueName: 'CUSTOMER',
          name: {
            create: {
              en: 'Customer',
              ar: 'مستخدم',
              ckb: 'مستخدم',
            },
          },
          Image: 'crud',
          Account: 'crud',
          Bank: 'r',
        },
      },
      username: 'customer',
      password: await bcrypt.hash('password', 12),
      bank: {
        connect: { id: bank.id },
      },
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
