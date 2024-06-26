import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {ConfigModule} from '@nestjs/config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthResolver } from './Resolver/auth.resolver';
import { AuthRepo } from './Repository/authRepo';
import { PrismaService } from './Repository/prismaService';
import { JwtService } from '@nestjs/jwt';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  }),
  ],
  controllers: [],
  providers: [AuthResolver, AuthRepo,PrismaService,JwtService],
})
export class AppModule {}
