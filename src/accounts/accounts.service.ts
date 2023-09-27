import { Body, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto) {
    const { userId, ...body } = createAccountDto;
    return this.prisma.account.create({
      data: {
        ...body,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll() {
    const data = await this.prisma.account.findMany({});

    const count = await this.prisma.account.count({});

    return { count, data };
  }

  async findMyAccounts(userId: string) {
    const where: Prisma.AccountFindManyArgs['where'] = {
      userId,
    };

    const data = await this.prisma.account.findMany({
      where,
    });

    const count = await this.prisma.account.count({
      where,
    });

    return { count, data };
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
