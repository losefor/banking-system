import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BankDto } from './entities/bank.entity';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { CheckPermissionsFor } from 'src/auth/guards/permissions.decorator';
import { SuperAdminOrManagerGuard } from 'src/auth/guards/superadmin-manager.guard';
import { CommonQueries } from 'src/common/dto/query-common.dto';

@ApiBearerAuth()
@ApiTags('Banks')
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Bank')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Bank created', type: BankDto })
  create(@Body() createBankDto: CreateBankDto) {
    return this.banksService.create(createBankDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard, SuperAdminOrManagerGuard)
  @CheckPermissionsFor('Bank')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiPaginatedResponse(BankDto)
  findAll(@Query() query: CommonQueries) {
    return this.banksService.findAll({
      skip: query.skip,
      take: query.take,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Bank')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Find one Bank', type: BankDto })
  findOne(@Param('id') id: string) {
    return this.banksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Bank')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Edit bank', type: BankDto })
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.banksService.update(id, updateBankDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Bank')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Remove created', type: BankDto })
  remove(@Param('id') id: string) {
    return this.banksService.remove(id);
  }
}
