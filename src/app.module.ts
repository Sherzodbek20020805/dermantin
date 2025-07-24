import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth-admin/auth.module';
import { AuthUserModule } from './auth-user/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_CONNECTION'),
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASS'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        logging: false,
        synchronize: true,
      }),
    }),
    UsersModule,
    AdminsModule,
    AuthModule,
    AuthUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
