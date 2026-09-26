import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';

const production = process.env.NODE_ENV === 'production';
const jwtSecret =
  process.env.JWT_SECRET ?? (production ? undefined : 'dev-only-jwt-secret');
if (!jwtSecret) {
  throw new Error('JWT_SECRET is required when NODE_ENV is production');
}

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: production ? true : join(__dirname, '..', 'schema.gql'),
      sortSchema: true,
      path: '/graphql',
      graphiql: !production,
    }),
    HealthModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
