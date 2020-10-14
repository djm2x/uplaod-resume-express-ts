import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, last, map, tap } from 'rxjs/operators';

const URL = 'http://localhost:3001/api/files';
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  get(selectedFile: File) {
    const fileId = `${selectedFile.name}-${selectedFile.lastModified}`;
    const headers = new HttpHeaders({
      size: selectedFile.size.toString(),
      'x-file-id': fileId,
      name: selectedFile.name
    });
    return this.http.get(`${URL}/status`, { headers });
  }


  post(selectedFile: File, res: any) {
    const fileId = `${selectedFile.name}-${selectedFile.lastModified}`;
    const uploadedBytes = res.uploaded; // GET response how much file is uploaded

    const headers2 = new HttpHeaders({
      size: selectedFile.size.toString(),
      'x-file-id': fileId,
      'x-start-byte': uploadedBytes.toString(),
      name: selectedFile.name
    });
    // Useful for showing animation of Mat Spinner
    const req = new HttpRequest(
      'POST',
      `${URL}/upload`,
      selectedFile.slice(uploadedBytes, selectedFile.size + 1),
      {
        headers: headers2,
        reportProgress: true // continously fetch data from server of how much file is uploaded
      }
    );
    return this.http.request(req)
  }

  post2(selectedFile: File, res: any) {
    const fileId = `${selectedFile.name}-${selectedFile.lastModified}`;
    // GET response how much file is uploaded
    const uploadedBytes = res.uploaded;

    const headers = new HttpHeaders({
      size: selectedFile.size.toString(),
      'x-file-id': fileId,
      'x-start-byte': uploadedBytes.toString(),
      name: selectedFile.name
    });

    return this.http.post(`${URL}/upload`, selectedFile.slice(uploadedBytes, selectedFile.size + 1), { headers, reportProgress: true });
  }

  upload0(files: FormData, folder) {
    return this.http.request(new HttpRequest('POST', `${URL}/upload0/${folder}`, files, { reportProgress: true }))
  }


}
