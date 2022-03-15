const env = process.env.NODE_ENV;
console.log(env)
module.exports = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  // entities: [
  //   `${env === 'development' ? 'src/packages/' : 'dist/packages/'}**/**.entity{.ts,.js}`,
  // ],
  // entities: ['/dist/packages/**/**.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
};
