import { Module } from '@nestjs/common';
import { UsersService } from './customers.service';
import { UsersController } from './customers.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
