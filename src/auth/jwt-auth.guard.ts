import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const autHeader = request.headers.authorization;

      const [type, token] = autHeader.split(' ');

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Authorization Error!');
      } else {
        const user = this.jwtService.verify(token);
        request.user = user;
        return true;
      }
    } catch (error) {
      throw new HttpException('Authorization Error!', HttpStatus.UNAUTHORIZED);
    }
  }
}
