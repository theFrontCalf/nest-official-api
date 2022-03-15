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

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  providers: [NewsService],
  controllers: [NewsController],
})
export default class NewsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: 'news/all',
      method: RequestMethod.POST,
    });
  }
}
