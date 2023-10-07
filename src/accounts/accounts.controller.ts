import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountDto } from './entities/account.entity';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommonQueries } from 'src/common/dto/query-common.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/customers/entities/user.entity';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { CheckPermissionsFor } from 'src/auth/guards/permissions.decorator';
import { SuperAdminOrManagerGuard } from 'src/auth/guards/superadmin-manager.guard';

@ApiBearerAuth()
@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Account')
  @ApiOperation({ summary: 'Dashboard: Create new account' })
  @ApiOkResponse({ description: 'Account created', type: AccountDto })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Account')
  @ApiOperation({ summary: 'Dashboard: Get all open accounts in the bank' })
  @ApiPaginatedResponse(AccountDto)
  findAll(@Query() query: CommonQueries) {
    return this.accountsService.findAll({
      skip: query.skip,
      take: query.take,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Account')
  @ApiOperation({ summary: 'Mobile: Get my accounts' })
  @ApiPaginatedResponse(AccountDto)
  findMyAccounts(@Query() query: CommonQueries, @User() user: UserDto) {
    return this.accountsService.findAll({
      skip: query.skip,
      take: query.take,
      where: { userId: user.id },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Account')
  @ApiOperation({ summary: 'Get details of specific ' })
  @ApiOkResponse({ description: 'Get account', type: AccountDto })
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Account')
  @ApiOkResponse({ description: 'Update account', type: AccountDto })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Account')
  @ApiOkResponse({ description: 'Remove account', type: AccountDto })
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }

  @ApiOkResponse({
    description:
      'This endpoint returns buffer to the client side so it will not work in swagger pleas use it in the browser test: fa250fc3-d53b-4d57-b0bb-8225df90c5a7',
  })
  @ApiOperation({
    summary: 'Generate account statement as PDF',
  })
  @Get('generate-account-statement/:id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Account')
  async generateAccountStatement(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const pdf = await this.accountsService.generateAccountStatement(id);

    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdf),
      'Content-Type': 'application/pdf',
    });
    res.end(pdf);
  }
}
