import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import UsersEntity from './users.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRpt: Repository<UsersEntity>,
    private cfgs: ConfigService,
  ) {}

  async findById(id: number) {
    const user = await this.usersRpt.findOne(id);
    if (!user) {
      throw new HttpException('not found', 401);
    }
    return this.buildUserDto(user);
  }

  async findOne(user: {
    userName: string;
    password: string;
  }): Promise<UsersEntity> {
    const findOneOptions = {
      userName: user.userName,
      // password: crypto.createHmac('sha256', user.password).digest('hex'),
      password: user.password,
    };

    return this.usersRpt.findOne(findOneOptions);
  }
  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 1);
    const SECRET = this.cfgs.get<string>('SECURITY_JWT_SECRET');
    return jwt.sign(
      {
        id: user.id,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
  private buildUserDto(user: UsersEntity) {
    const userDto = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    };

    return userDto;
  }
}
