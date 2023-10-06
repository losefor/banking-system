import { PickType } from '@nestjs/swagger';
import { AccountDto } from '../entities/account.entity';

export class CreateAccountDto extends PickType(AccountDto, [
  'balance',
  'accountType',
  'userId',
]) {}
