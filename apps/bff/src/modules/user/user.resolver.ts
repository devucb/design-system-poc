import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser, type JwtUser } from '../auth/current-user.decorator';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly users: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() actor: JwtUser): User {
    const user = this.users.findById(actor.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return this.users.toPublic(user);
  }
}
