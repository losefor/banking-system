import { $Enums, PendingTransaction } from '@prisma/client';

export class TransactionDto implements PendingTransaction {
  id: string;
  amount: number;
  type: $Enums.TransactionType;
  fromAccountId: string;
  toAccountId: string;
  createdAt: Date;
}
