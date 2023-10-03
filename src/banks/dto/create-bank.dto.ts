import { PickType } from '@nestjs/swagger';
import { BankDto } from '../entities/bank.entity';

export class CreateBankDto extends PickType(BankDto, ['name']) {}
