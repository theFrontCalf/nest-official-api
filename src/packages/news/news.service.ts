import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import NewsEntity from './news.entity';

@Injectable()
export default class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRpt: Repository<NewsEntity>,
    private cfgs: ConfigService,
  ) {}
  async findAll(params: {
    pageIndex: number;
    pageSize: number;
    module?: string;
  }) {
    const { pageIndex, pageSize, module } = params;
    let res = null;
    // console.log(this.cfgs.get('TYPEORM_DATABASE'));
    const param = {
      where: Object.assign(
        { isDeleted: false },
        module ? { module: In([module, 'common']) } : {},
      ),
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    };
    res = await this.newsRpt.findAndCount(param);

    return { pageIndex, pageSize, list: res[0], total: res[1] };
  }
}
