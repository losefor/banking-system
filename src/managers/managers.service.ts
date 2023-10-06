import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-managers.dto';
import { UpdateUserDto } from './dto/update-managers.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { bankId, ...body } = createUserDto;

    const permission = await this.prisma.permission.findUnique({
      where: { uniqueName: 'MANAGER' },
    });

    return this.prisma.user.create({
      data: {
        ...body,
        bank: { connect: { id: bankId } },
        permission: { connect: { id: permission.id } },
      },
    });
  }

  async findAll() {
    const where: Prisma.UserFindManyArgs['where'] = {
      permission: { uniqueName: 'MANAGER' },
    };

    const data = await this.prisma.user.findMany({ where });
    const count = await this.prisma.user.count({ where });

    return { count, data };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
