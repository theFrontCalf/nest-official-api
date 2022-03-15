import { AuthMiddleware } from 'src/commen/middleware/auth';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsEntity from './news.entity';
import NewsController from './news.controller';
import NewsService from './news.service';
import UsersEntity from '../users/users.entity';
import UsersModule from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, UsersEntity]), UsersModule],
  providers: [NewsService],
  controllers: [NewsController],
})
export default class NewsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'news/all',
      method: RequestMethod.POST,
    });
  }
}
