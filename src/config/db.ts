import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const devDB: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root123456',
  database: 'jz_official',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
export const pordDB: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root123456',
  database: 'jz_official2',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};

const config = process.env.NODE_ENV === 'production' ? pordDB : devDB;

export default config;
