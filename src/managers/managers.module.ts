import { Module } from '@nestjs/common';
import { UsersService } from './managers.service';
import { UsersController } from './managers.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class ManagerModule {}
