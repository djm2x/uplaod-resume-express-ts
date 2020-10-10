import { SuperRepository } from './super.repository';
import { Reponse } from '../model/models';

export class ReponseRepository extends SuperRepository<Reponse> {

  constructor() {
    super(Reponse);
  }
}
