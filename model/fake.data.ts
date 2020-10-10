import { User, Parcours, UserParcoursVisite, UserParcoursCree, Etap, Quizz, Reponse } from './models';
import * as faker from 'faker';
// import { UowService } from '../services/uow.service';
import Container from 'typedi';
import { UserRepository } from '../repository/user.repository';
import { ParcoursRepository } from '../repository/parcours.repository';
import { UserParcoursVisiteRepository } from '../repository/user.parcours.visite.repository';
import { UserParcoursCreeRepository } from '../repository/user.parcours.cree.repository';
import { EtapRepository } from '../repository/etap.repository';
import { QuizzRepository } from '../repository/quizz.repository';
import { ReponseRepository } from '../repository/reponse.repository';


export class FakeData {
  // private uow = Container.get(UowService);
  private serviceUser = Container.get(UserRepository);
  private serviceParcours = Container.get(ParcoursRepository);
  private serviceUserParcoursVisite = Container.get(UserParcoursVisiteRepository);
  private serviceUserParcoursCree = Container.get(UserParcoursCreeRepository);
  private serviceEtap = Container.get(EtapRepository);
  private serviceQuizz = Container.get(QuizzRepository);
  private serviceReponse = Container.get(ReponseRepository);

  constructor() { }

  async insertSomeFakeData() {
    const i = await this.serviceUser.count();
    if (i > 0) {
      return;
    }
    const count = 100;
    await this.addUsers(count);
    await this.addParcours(count);
    await this.addUserParcoursVisite(count);
    await this.addUserUserParcoursCree(count);
    await this.addEtap(count);
    await this.addQuizz(count);
    await this.addReponse(count);

    console.log('Database seeding has done succesfully');
  }

  async addUsers(count) {
    const list = [...Array(count - 1).keys()].map(i => {
      const o = new User();
      o.firstname = faker.name.firstName();
      o.lastname = faker.name.lastName();
      o.email = faker.internet.email();
      o.password = faker.internet.password(6);
      o.role = 'user';
      return o;
    });

    list.push({
      firstname: 'sa',
      lastname: 'admin',
      email: 'admin@angular.io',
      password: '123',
      role: 'admin'
    } as any);

    await this.serviceUser.addList(list);
  }

  async addParcours(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new Parcours();
      o.titre = faker.name.title();
      o.image = faker.image.imageUrl();
      o.descriptif = faker.name.jobDescriptor();
      o.temps = faker.random.number(10);
      o.lat = +faker.address.latitude();
      o.lng = +faker.address.longitude();
      return o;
    });

    await this.serviceParcours.addList(list);
  }

  async addUserParcoursVisite(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new UserParcoursVisite();
      o.userId = i + 1;
      o.parcoursId = i + 1;
      o.date = faker.date.future();
      return o;
    });

    await this.serviceUserParcoursVisite.addList(list);
  }

  async addUserUserParcoursCree(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new UserParcoursCree();
      o.userId = i + 1;
      o.parcoursId = i + 1;
      o.date = faker.date.future();
      return o;
    });

    await this.serviceUserParcoursCree.addList(list);
  }

  async addEtap(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new Etap();
      o.adresse = faker.name.title();
      o.lat = +faker.address.latitude();
      o.lng = +faker.address.longitude();
      o.parcoursId = faker.random.number({ min: 1, max: 10 });

      return o;
    });

    await this.serviceEtap.addList(list);
  }

  async addQuizz(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new Quizz();
      o.question = faker.name.title();
      o.reponse = `reponse ${faker.random.number({ min: 1, max: 3 })}`;
      o.choix = `['reponse 1', 'reponse 2','reponse 3',]`;
      o.etapId = faker.random.number({ min: 1, max: 10 });

      return o;
    });

    await this.serviceQuizz.addList(list);
  }

  async addReponse(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new Reponse();
      o.reponse = faker.name.title();
      o.date = faker.date.past();
      // o.lat = faker.address.latitude();
      // o.lng = faker.address.longitude();
      o.quizzId = faker.random.number({ min: 1, max: 10 });
      o.userId = faker.random.number({ min: 1, max: 10 });

      return o;
    });

    await this.serviceReponse.addList(list);
  }
}
