import { AuthMiddleware } from 'src/commen/middleware/auth';
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersService from './users.service';
import UsersController from './users.controller';
import UsersEntity from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export default class UsersModule {}
