import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import _ from 'lodash';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
      include: { permission: true },
    });

    const reshapePerms = _.omit(user.permission, [
      'id',
      'nameId',
      'updatedAt',
      'createdAt',
      'warehouseId',
      'uniqueName',
    ]);

    return {
      ...user,
      permission: reshapePerms,
    };
  }
}
