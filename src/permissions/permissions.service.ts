import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  create(createPermissionDto: CreatePermissionDto) {
    const { name, ...body } = createPermissionDto;
    return this.prisma.permission.create({
      data: { ...body, name: { create: { ar: name } } },
    });
  }

  async findAll() {
    const data = await this.prisma.permission.findMany();
    const count = await this.prisma.permission.count();

    return { count, data };
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const { name, ...body } = updatePermissionDto;
    return this.prisma.permission.update({
      where: { id },
      data: { ...body, name: { update: { ar: name } } },
    });
  }

  remove(id: string) {
    return this.prisma.permission.delete({
      where: {
        id,
      },
    });
  }
}
