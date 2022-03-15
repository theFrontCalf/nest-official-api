import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import dbConfig from './config/db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import NewsModule from './packages/news/news.module';
import { resolve } from 'path';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    // ConfigModule.forRoot({
    //   envFilePath: `env/.env.${process.env.NODE_ENV}`,
    //   isGlobal: true,
    // }),
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
