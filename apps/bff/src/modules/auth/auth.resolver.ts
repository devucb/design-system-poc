import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthPayload } from './auth.payload';
import { AuthService } from './auth.service';
import { LoginInput } from './login.input';
import { RegisterInput } from './register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input', { type: () => LoginInput }) input: LoginInput): Promise<AuthPayload> {
    return this.auth.login(input);
  }

  @Mutation(() => AuthPayload)
  register(
    @Args('input', { type: () => RegisterInput }) input: RegisterInput,
  ): AuthPayload {
    return this.auth.register(input);
  }
}
