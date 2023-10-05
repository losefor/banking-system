import { PickType } from '@nestjs/swagger';
import { TransactionDto } from '../entities/transaction.entity';

export class CreateTransactionDto extends PickType(TransactionDto, [
  'amount',
  'fromAccountId',
  'toAccountId',
  'type',
]) {}
