import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create({ fromAccountId, toAccountId, ...body }: CreateTransactionDto) {
    return this.prisma.pendingTransaction.create({
      data: {
        ...body,
        fromAccount: { connect: { id: fromAccountId } },
        toAccount: { connect: { id: toAccountId } },
      },
    });
  }

  async confirmTransaction(transactionId: string) {
    const transaction = await this.prisma.pendingTransaction.findUnique({
      where: { id: transactionId },
    });

    const account = await this.prisma.account.findUnique({
      where: { id: transaction.fromAccountId },
    });

    if (account.balance < transaction.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    await this.prisma.confirmedTransaction.create({
      data: {
        amount: transaction.amount,
        fromAccount: { connect: { id: transaction.fromAccountId } },
        toAccount: { connect: { id: transaction.toAccountId } },
        type: 'WITHDRAWAL',
      },
    });
  }

  async findAll(args: Prisma.PendingTransactionFindManyArgs) {
    const data = await this.prisma.pendingTransaction.findMany(args);
    const count = await this.prisma.pendingTransaction.count({
      where: args.where,
    });

    return { count, data };
  }

  remove(id: string) {
    return this.prisma.pendingTransaction.delete({
      where: { id },
    });
  }
}
