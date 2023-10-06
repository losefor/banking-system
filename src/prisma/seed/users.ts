import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (prisma: PrismaClient) => {
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
        connect: { uniqueName: 'SUPER_ADMIN' },
      },
      username: 'super_admin',
      bank: { connect: { id: bank.id } },
      password: await bcrypt.hash('password', 12),
    },
  });

  // Seed manager
  const manager = await prisma.user.create({
    data: {
      email: 'manager@manager.com',
      address: 'Al-bayaa',
      fullName: 'Mohammed Paqer',
      permission: {
        connect: {
          uniqueName: 'MANAGER',
        },
      },
      username: 'manager',
      password: await bcrypt.hash('password', 12),
      bank: {
        connect: { id: bank.id },
      },
    },
  });

  // Seed Customer
  const user = await prisma.user.create({
    data: {
      email: 'customer@customer.com',
      address: 'Al-bayaa',
      fullName: 'Mohammed Paqer',
      permission: {
        connect: {
          uniqueName: 'CUSTOMER',
        },
      },
      username: 'customer',
      password: await bcrypt.hash('password', 12),
      bank: {
        connect: { id: bank.id },
      },
    },
  });

  // seed account
  const bankAccount = await prisma.account.create({
    data: {
      balance: 1850,
      user: {
        connect: { id: user.id },
      },
      accountType: 'CURRENT',
    },
  });

  // seed account
  const account = await prisma.account.create({
    data: {
      id: 'fa250fc3-d53b-4d57-b0bb-8225df90c5a7',
      balance: 1850,
      user: {
        connect: { id: user.id },
      },
      accountType: 'CURRENT',
    },
  });

  // seed transaction
  await prisma.confirmedTransaction.create({
    data: {
      amount: 1000,
      fromAccount: {
        connect: { id: account.id },
      },
      toAccount: { connect: { id: bankAccount.id } },
      type: 'DEPOSIT',
    },
  });

  // seed transaction
  await prisma.confirmedTransaction.create({
    data: {
      amount: 50,
      fromAccount: {
        connect: { id: account.id },
      },
      toAccount: { connect: { id: bankAccount.id } },
      type: 'WITHDRAWAL',
    },
  });

  // seed transaction
  await prisma.confirmedTransaction.create({
    data: {
      amount: 100,
      fromAccount: {
        connect: { id: account.id },
      },
      toAccount: { connect: { id: bankAccount.id } },
      type: 'WITHDRAWAL',
    },
  });

  await prisma.confirmedTransaction.create({
    data: {
      amount: 1000,
      fromAccount: {
        connect: { id: account.id },
      },
      toAccount: { connect: { id: bankAccount.id } },
      type: 'DEPOSIT',
    },
  });
};
