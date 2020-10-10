import { SuperRepository } from './super.repository';
import { UserParcoursCree } from '../model/models';

export class UserParcoursCreeRepository extends SuperRepository<UserParcoursCree> {

  constructor() {
    super(UserParcoursCree);
  }
}
