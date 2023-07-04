import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userRole = decodedToken.scope;

      if (userRole === 'user' || userRole === 'admin') {
        return true;
      }

      // If the user is not an admin, you can throw an exception or redirect them to an unauthorized page
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    } catch (error) {
      // Handle JWT verification error
      throw new UnauthorizedException('Invalid token');
    }
  }
}
