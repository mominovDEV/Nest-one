import { UnauthorizedException } from '@nestjs/common';
import { ROLES_KEY } from './../decorators/roles-auth.decorators';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core/services';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Foydalanuvchi Authorizationdan utmagan',
      });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Foydalanuvchi Authorizationdan utmagan',
      });
    }
    let user: any;
    try {
      user = this.jwtService.verify(token);
      console.log(user);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Foydalanuvchi Authorizationdan utmagan',
      });
    }
    req.user = user;
    const permission = user.roles.some((role: any) =>
      requiredRoles.includes(role.value),
    );
    if (!permission) {
      throw new ForbiddenException({
        message: 'Sizga ruxsat etilmagan',
      });
    }
    return true;
  }
}
