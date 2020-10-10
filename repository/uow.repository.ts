import { User } from '../model/models';
import { UserRepository } from './user.repository';

export class UowRepository {

  users = new UserRepository();

  constructor() { }

  // post3(model: User) {
  //   return this.context.query(`insert into user values(${model.id},'${model.name}','${model.date}')`);
  // }
}
