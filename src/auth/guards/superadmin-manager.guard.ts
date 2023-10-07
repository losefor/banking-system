import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserDto } from 'src/customers/entities/user.entity';

@Injectable()
export class SuperAdminOrManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Get the request form the contexts
    const req = context.switchToHttp().getRequest();

    const user = req.user as UserDto;

    console.log({ user });

    const perms = ['SUPER_ADMIN', 'MANAGER'];

    if (perms.includes(user.permission.uniqueName)) {
      return true;
    }

    return false;
  }
}
