import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import type { JwtUser } from './current-user.decorator';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const gql = GqlExecutionContext.create(context);
    const request = gql.getContext().req as {
      headers?: { authorization?: string };
      user?: JwtUser;
    };
    const header = request.headers?.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request.user = this.jwt.verify<JwtUser>(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
