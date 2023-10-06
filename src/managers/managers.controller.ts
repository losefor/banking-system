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
import { UsersService } from './managers.service';
import { CreateUserDto } from './dto/create-managers.dto';
import { UpdateUserDto } from './dto/update-managers.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { CheckPermissionsFor } from 'src/auth/guards/permissions.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response';
import { UserDto } from 'src/customers/entities/user.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@CheckPermissionsFor('Manager')
@ApiTags('Managers')
@Controller('managers')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Super admin: Create new customer' })
  @ApiOkResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(UserDto)
  @ApiOperation({ summary: 'Super admin: Get Managers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Super admin: Get info of single Managers' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Super admin: Update Managers info' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({ summary: 'Super admin: Remove Managers' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
