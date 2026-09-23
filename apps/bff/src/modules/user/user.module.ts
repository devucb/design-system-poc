import { Module } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserResolver, GqlAuthGuard],
  exports: [UserService],
})
export class UserModule {}
