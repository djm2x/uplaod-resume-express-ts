import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class FileUploadService {
  controller = 'files';
  constructor(private http: HttpClient, @Inject('API_URL') private urlApi: string) { }

  // postFile(file) {
  //   return this.http.post(`${this.urlApi}/files/postFile`, file, { reportProgress: true });
  // }

  // deleteFile(filename, folder) {
  //   return this.http.post(`${this.urlApi}/files/deleteFile/`, { filename, folder }, { reportProgress: true });
  // }

  // download(filename) {
  //   return this.http.get(`${this.url}/Visite/${filename}`);
  // }

  deleteFiles(filenames: string[], folder) {
    if (filenames.length === 0) {
      return of(null);
    }
    return this.http.post(`${this.urlApi}/${this.controller}/deleteFiles/`, { filenames, folder }, { reportProgress: true });
  }

  uploadFiles0(files: FormData, folder) {
    if (!files) {
      return of(null);
    }
    return this.http.post(`${this.urlApi}/${this.controller}/uploadFiles/${folder}`, files, {
      // headers: {'Content-Type': 'multipart/form-data'},
      reportProgress: true,
    });
  }

  uploadFiles(files: FormData, folder) {
    // tslint:disable-next-line:max-line-length
    return this.http.request(new HttpRequest('POST', `${this.urlApi}/${this.controller}/uploadFiles/${folder}`, files, { reportProgress: true }))
  }

}
