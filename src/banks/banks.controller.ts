import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankDto } from './entities/bank.entity';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response';

@ApiTags('Banks')
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Bank created', type: BankDto })
  create(@Body() createBankDto: CreateBankDto) {
    return this.banksService.create(createBankDto);
  }

  @Get()
  @ApiOperation({ summary: 'Dashboard' })
  @ApiPaginatedResponse(BankDto)
  findAll() {
    return this.banksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Find one Bank', type: BankDto })
  findOne(@Param('id') id: string) {
    return this.banksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Edit bank', type: BankDto })
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.banksService.update(id, updateBankDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Dashboard' })
  @ApiOkResponse({ description: 'Remove created', type: BankDto })
  remove(@Param('id') id: string) {
    return this.banksService.remove(id);
  }
}
