import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<User> {

  constructor() {
    super('users');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, nom, prenom, email, tel, adresse, cin, role, idVille, ) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${nom}/${prenom}/${email}/${tel}/${adresse}/${cin}/${role}/${idVille}`);
  }

}
