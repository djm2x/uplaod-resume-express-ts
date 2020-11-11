import { getRepository } from 'typeorm';
import { User } from './models';
import * as faker from 'faker';


export class SeedData {

  constructor() { 
    this.up();
  }

  async up() {
    if ((await getRepository(User).count()) === 0) {
      await this.Users();

      console.log('Seed data successfuly');
    }
  }

  Users(count = 10) {
    const list = [...Array(count - 1).keys()].map((_, i) => {
      const o = new User();
      o.id = null
      o.nom = i === 0 ? 'super' : faker.name.firstName();
      o.prenom = i === 0 ? 'admin' : faker.name.lastName();
      o.email = i === 0 ? 'sa@angular.io' : faker.internet.email();
      o.password = '123';
      o.isActive = faker.random.boolean();
      o.date = faker.date.future();
      o.imageUrl = faker.image.avatar();
      o.role = i === 0 ? 'admin' : 'user';

      return o;
    });

    return getRepository(User).createQueryBuilder().insert().values(list).execute();
  }

  
}
