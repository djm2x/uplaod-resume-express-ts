import { SuperRepository } from './super.repository';
import { Parcours } from '../model/models';

export class ParcoursRepository extends SuperRepository<Parcours> {

  constructor() {
    super(Parcours);
  }
}
