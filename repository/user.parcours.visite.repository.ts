import { SuperRepository } from './super.repository';
import { UserParcoursVisite } from '../model/models';

export class UserParcoursVisiteRepository extends SuperRepository<UserParcoursVisite> {

  constructor() {
    super(UserParcoursVisite);
  }
}
