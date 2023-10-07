import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './customers.service';
import { CreateUserDto } from './dto/create-customers.dto';
import { UpdateUserDto } from './dto/update-customers.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { CheckPermissionsFor } from 'src/auth/guards/permissions.decorator';
import { UserDto } from './entities/user.entity';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Customer')
  @ApiOperation({ summary: 'Manager: Create new customer' })
  @ApiOkResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Customer')
  @ApiPaginatedResponse(UserDto)
  @ApiOperation({ summary: 'Manager: Get customers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Customer')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Manager: Get info of single customer' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Customer')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Manager: Update customer info' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @CheckPermissionsFor('Customer')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Manager: Remove customer' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
