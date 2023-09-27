import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Response } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get('me')
  findMyAccounts() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

  @ApiOkResponse({
    description:
      'This endpoint returns buffer to the client side so it will not work in swagger pleas use it in the browser',
  })
  @Get('generate-account-statement/:id')
  async generateAccountStatement(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const pdf = await this.accountsService.generateAccountStatement(+id);

    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdf),
      'Content-Type': 'application/pdf',
    });
    res.end(pdf);
  }
}
