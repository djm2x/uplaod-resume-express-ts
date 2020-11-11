import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { of } from 'rxjs';
import { HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends SuperService<any> {

  constructor() {
    super('files');
  }

  deleteFiles(filenames: string[], folder) {
    if (filenames.length === 0) {
      return of(null);
    }
    return this.http.post(`${this.urlApi}/${this.controller}/deleteFiles/`, { filenames, folder });
  }

  uploadFiles0(files: FormData, folder) {
    if (!files) {
      return of(null);
    }

    return this.http.post(`${this.urlApi}/${this.controller}/uploadFiles/${folder}`, files, {
      headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
      reportProgress: true,
    });
  }

  uploadFiles(files: FormData, folder) {
    // tslint:disable-next-line:max-line-length
    return this.http.request(new HttpRequest('POST', `${this.urlApi}/${this.controller}/uploadFiles/${folder}`, files, { reportProgress: true }))
  }

}
