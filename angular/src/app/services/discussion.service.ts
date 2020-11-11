import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Discussion } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService extends SuperService<Discussion> {

  constructor() {
    super('discussions');
  }

  // getAll(startIndex, pageSize, sortBy, sortDir, object, message, idUser/*, senderName, idReceiver, idCours, */) {

  //   return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${object}/${message}/${idUser}`);
  // }

  getContacts(idUser) {
    return this.http.get<Discussion[]>(`${this.urlApi}/${this.controller}/getContacts/${idUser}`);
  }

}
