import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpException,
} from '@nestjs/common';
import { hmacSha256 } from 'src/utils';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(
    @Body() { userName, password }: { userName: string; password: string },
  ) {
    const user = await this.usersService.findOne({
      userName,
      password: hmacSha256(password),
    });
    if (!user) {
      throw new HttpException('not found', 401);
    }

    return this.usersService.generateJWT(user);
  }

  @Post('signin')
  async signin(@Body() user: { userName: string; password: string }) {
    const res = await this.usersService.createOne(user);
    return 'success';
  }
}
