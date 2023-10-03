import { PickType } from '@nestjs/swagger';
import { PermissionDto } from '../entities/permission.entity';

export class CreatePermissionDto extends PickType(PermissionDto, [
  'Account',
  'Bank',
  'Image',
  'name',
  'uniqueName',
]) {}
