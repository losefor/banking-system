import { Permission } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionDto implements Permission {
  Customer: string;
  Manager: string;
  id: string;
  nameId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  uniqueName: string;

  @IsString()
  Account: string;

  @IsString()
  Bank: string;

  createdAt: Date;
  updatedAt: Date;

  @IsString()
  Image: string;
}
