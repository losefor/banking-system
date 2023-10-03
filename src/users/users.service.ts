import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { String } from 'aws-sdk/clients/cloudtrail';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { bankId, ...body } = createUserDto;

    const permission = await this.prisma.permission.findUnique({
      where: { uniqueName: 'USER' },
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
    const data = await this.prisma.permission.findMany();
    const count = await this.prisma.permission.count();

    return { count, data };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { bankId, ...body } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...body,
      },
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
