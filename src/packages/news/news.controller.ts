import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import NewsService from './news.service';

@Controller('news')
export default class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('all')
  async findAll(@Body() param: { pageIndex: number; pageSize: number }) {
    return this.newsService.findAll(param);
  }
}
