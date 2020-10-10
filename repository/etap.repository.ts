import { SuperRepository } from './super.repository';
import { Etap } from '../model/models';

export class EtapRepository extends SuperRepository<Etap> {

  constructor() {
    super(Etap);
  }
}
