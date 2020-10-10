import { SuperRepository } from './super.repository';
import { User } from '../model/models';

export class UserRepository extends SuperRepository<User> {

  constructor() {
    super(User);
  }


  // post3(model: User) {
  //   return this.context.query(`insert into user values(${model.id},'${model.name}','${model.date}')`);
  // }
}
