/* eslint-disable @typescript-eslint/no-namespace */
import UsersService from 'src/packages/users/users.service';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { aesDecrypt } from 'src/utils';

declare global {
  namespace Express {
    interface Request {
      $current?: any;
    }
  }
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private cfgs: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    try {
      const SECRET = this.cfgs.get<string>('SECURITY_JWT_SECRET');
      const PREFIX = this.cfgs.get<string>('SECURITY_CRYPTO_SECRET_PREFIX');
      const decrypted = aesDecrypt(authHeaders, PREFIX + SECRET);
      let jwtToken = '';
      const matches = (decrypted as string).split(' ');
      if (matches && matches[0] === PREFIX.trim()) {
        jwtToken = matches[1];
      }
      const decoded: Record<string, any> = verify(jwtToken, SECRET);
      const user = await this.usersService.findById(decoded.id);
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      req.$current = user;
      next();
    } catch (e) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
