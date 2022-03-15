import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from 'nestjs-config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import NewsModule from './packages/news/news.module';
import UsersModule from './packages/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cfgs: ConfigService) => ({
        type: 'mysql',
        entities: ['dist/**/*.entity{.ts,.js}'],
        host: cfgs.get('TYPEORM_HOST'),
        port: cfgs.get('TYPEORM_PORT'),
        username: cfgs.get('TYPEORM_USERNAME'),
        password: cfgs.get('TYPEORM_PASSWORD'),
        database: cfgs.get('TYPEORM_DATABASE'),
        synchronize: cfgs.get('TYPEORM_SYNCHRONIZE'),
      }),
    }),
    // 第二套连接数据库方案 + nestjs-config
    // ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (config: ConfigService) => config.get('db'),
    //   inject: [ConfigService],
    // }),
    NewsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
