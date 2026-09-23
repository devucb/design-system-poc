import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver, GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
