import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Message } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends SuperService<Message> {

  constructor() {
    super('messages');
  }

  postMessage = (o: Message) => this.http.post<Message>(`${this.urlApi}/${this.controller}/postMessage`, o);

  getAll(startIndex, pageSize, sortBy, sortDir, object, message, idUser/*, senderName, idReceiver, idCours, */) {

    return this.http.get(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${object}/${message}/${idUser}`);
  }

  getMessages(idDiscussion) {
    return this.http.get<Message[]>(`${this.urlApi}/${this.controller}/getMessages/${idDiscussion}`);
  }

}
