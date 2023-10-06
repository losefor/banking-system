import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { CheckPermissionsFor } from 'src/auth/guards/permissions.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/customers/entities/user.entity';
import { SuperAdminOrManagerGuard } from 'src/auth/guards/superadmin-manager.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@CheckPermissionsFor('Transaction')
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':id/submit')
  submitTransactions(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Post(':id/confirm')
  @UseGuards(SuperAdminOrManagerGuard)
  confirmTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('me/pending')
  @UseGuards(SuperAdminOrManagerGuard)
  findAllPending() {
    return this.transactionsService.findAllPending({});
  }

  @Get('me/pending')
  findAllMyPending(@User() user: UserDto) {
    return this.transactionsService.findAllPending({
      where: {
        fromAccount: {
          userId: user.id,
        },
      },
    });
  }

  @Get('me/confirmed')
  findAllMyConfirmed(@User() user: UserDto) {
    return this.transactionsService.findAllConfirmed({
      where: {
        fromAccount: {
          userId: user.id,
        },
      },
    });
  }

  @Delete(':id')
  @UseGuards(SuperAdminOrManagerGuard)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
