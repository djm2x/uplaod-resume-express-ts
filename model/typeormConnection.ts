import { createConnection, ConnectionOptions } from 'typeorm';
import { SeedData } from './seed.data';

export  class TypeormConnection {

    constructor() {}

    static async dbConfig() {
        const opts: ConnectionOptions = {
          type: 'sqlite',
          name: 'default',
          database: `${process.cwd()}/data/db-travel.sqlite`,
          entities: [`${process.cwd()}/model/*{.js,.ts}`],
          synchronize: true,
          logging: [
            'error',
            // 'query',
            // 'schema'
          ],
        }
    
        const connection = await createConnection(opts)
          
        console.log('Connection Database status : ', connection.isConnected);

        const m = new SeedData();
      }
}