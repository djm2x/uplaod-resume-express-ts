import { SuperRepository } from './super.repository';
import { Quizz } from '../model/models';

export class QuizzRepository extends SuperRepository<Quizz> {

  constructor() {
    super(Quizz);
  }
}
