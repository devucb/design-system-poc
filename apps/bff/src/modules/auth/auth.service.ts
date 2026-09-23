import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, UserService } from '../user/user.service';
import type { LoginInput } from './login.input';
import type { RegisterInput } from './register.input';
import type { AuthPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(input: LoginInput): Promise<AuthPayload> {
    const email = input.email.trim().toLowerCase();
    const user = this.users.findByEmail(email);
    if (!user || user.passwordHash !== hashPassword(input.password)) {
      console.log('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }
    return await new Promise<AuthPayload>(async resolve => {
      setTimeout(() => {
        resolve(this.issue(user.id, user.email));
      }, 6000);
    });
  }

  register(input: RegisterInput): AuthPayload {
    const email = input.email.trim().toLowerCase();
    if (this.users.findByEmail(email)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = this.users.create(email, input.password);
    return this.issue(user.id, user.email);
  }

  private issue(id: string, email: string): AuthPayload {
    return {
      accessToken: this.jwt.sign({ sub: id, email }),
      user: { id, email },
    };
  }
}
