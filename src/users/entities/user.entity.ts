import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { PermissionDto } from 'src/permissions/entities/permission.entity';

export class UserDto implements User {
  bankId: string;
  fullName: string;
  address: string;

  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Min(8)
  password: string;

  @IsEmail()
  email: string;

  @IsUUID()
  @IsString()
  permissionId: string;

  createdAt: Date;
  updatedAt: Date;

  // Include
  permission?: PermissionDto;
}
