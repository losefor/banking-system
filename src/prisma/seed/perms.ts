import { PrismaClient } from '@prisma/client';

export const seedPerms = async (prisma: PrismaClient) => {
  // seed super admin perms
  await prisma.permission.create({
    data: {
      uniqueName: 'SUPER_ADMIN',
      name: {
        create: {
          en: 'Admin',
          ar: 'ادمن',
          ckb: 'ادمن',
        },
      },
      Image: 'crud',
      Account: 'crud',
      Bank: 'crud',
      Customer: 'crud',
      Manager: 'crud',
    },
  });

  // seed customer
  await prisma.permission.create({
    data: {
      uniqueName: 'CUSTOMER',
      name: {
        create: {
          en: 'Customer',
          ar: 'مستخدم',
          ckb: 'مستخدم',
        },
      },
      Image: '',
      Account: 'r',
      Bank: 'r',
      Customer: 'r',
      Manager: '',
    },
  });

  // seed manager
  await prisma.permission.create({
    data: {
      uniqueName: 'MANAGER',
      name: {
        create: {
          en: 'Manager',
          ar: 'مدير',
          ckb: 'مدير',
        },
      },
      Image: 'crud',
      Account: 'crud',
      Bank: '',
      Customer: 'crud',
      Manager: 'crud',
    },
  });
};
