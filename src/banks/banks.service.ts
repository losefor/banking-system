import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BanksService {
  constructor(private prisma: PrismaService) {}

  create(createBankDto: CreateBankDto) {
    return this.prisma.bank.create({ data: createBankDto });
  }

  async findAll() {
    const data = await this.prisma.bank.findMany();
    const count = await this.prisma.bank.count();

    return { count, data };
  }

  findOne(id: string) {
    return this.prisma.bank.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBankDto: UpdateBankDto) {
    return this.prisma.bank.update({
      where: { id },
      data: updateBankDto,
    });
  }

  remove(id: string) {
    return this.prisma.bank.delete({ where: { id } });
  }
}
