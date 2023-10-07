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
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Transaction')
  submitTransactions(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Post('confirm')
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Transaction')
  confirmTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Transaction')
  findAllPending() {
    return this.transactionsService.findAllPending({});
  }

  @Get('me/pending')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Transaction')
  @UseGuards()
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
