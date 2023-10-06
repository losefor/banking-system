import { Bank } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class BankDto implements Bank {
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
