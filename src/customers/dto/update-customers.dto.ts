import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-customers.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['bankId']),
) {}
