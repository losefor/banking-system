import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Account } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class AccountDto implements Account {
  id: string;

  @IsNumber()
  balance: number;

  @IsEnum($Enums.AccountType)
  @ApiProperty({ enum: $Enums.AccountType })
  accountType: $Enums.AccountType;
}
