import { User } from './model/models';
import { RoutingControllersOptions } from 'routing-controllers';
import { ConnectionOptions } from 'typeorm';

export const config: IConfig = {
  jwt: {
    jwtSecret: '@QEGTUI'
  },
  db: {
    type: 'sqlite',
    name: 'default',
    database: `${__dirname}/data/my.sqlite`,
    // entities: [__dirname + "/entity/*{.js,.ts}"],
    entities: [
      User,
      // Section,
      // Chiffre,
      // Client,
    ],
    synchronize: true,
    logging: [
      'error',
      // 'query',
      // 'schema'
    ],
  },
  server: {
    routePrefix: '/api',
    cors: true,
    classTransformer: true,
    controllers: [`${__dirname}/controllers/*.ts`, `${__dirname}/controllers/*.js`],
    middlewares: [`${__dirname}/middlewares/*.ts`, `${__dirname}/middlewares/*.js`],
    // interceptors: [__dirname + '/interceptors/*.js'],
  }
}

interface IConfig {
  jwt: { jwtSecret: string };
  server: RoutingControllersOptions,
  db: ConnectionOptions,
}
