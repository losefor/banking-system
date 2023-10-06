import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/customers/entities/user.entity';

export class CreateUserDto extends PickType(UserDto, [
  'address',
  'bankId',
  'email',
  'username',
  'password',
  'fullName',
]) {}
