import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectService } from '../inject.service';

export class SuperService<T> implements ISuperService {

  // @Inject(HttpClient) protected http: HttpClient;
  protected http = InjectService.injector.get(HttpClient);
  protected urlApi: string = InjectService.injector.get('API_URL');
  protected url: string = InjectService.injector.get('BASE_URL');

  constructor(public controller: string) { }

  getList(startIndex, pageSize, sortBy, sortDir) {
    return this.http.get<{list: T[], count: number}>
            (`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}`);
  }
  get = () => this.http.get<T[]>(`${this.urlApi}/${this.controller}`);
  count = () => this.http.get<number>(`${this.urlApi}/${this.controller}/count`);
  getOne = (id) => this.http.get<T>(`${this.urlApi}/${this.controller}/${id}`);
  post = (o: T) => this.http.post<T>(`${this.urlApi}/${this.controller}`, o);
  put = (id: number | string, o: T) => this.http.put<any>(`${this.urlApi}/${this.controller}/${id}`, o);
  delete = (id) => this.http.delete<any>(`${this.urlApi}/${this.controller}/${id}`);

  updateRange(o: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/updateRange`, o);
  }

  deleteRange(o: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/deleteRange`, o);
  }

  postRange(o: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/postRange`, o);
  }

  putRange(modelsToDelete: T[], modelsToAdd: T[]) {
    return this.http.post(`${this.urlApi}/${this.controller}/putRange`, { modelsToDelete, modelsToAdd });
  }

  autocomplete(column: string, name: string) {
    return this.http.get(`${this.urlApi}/${this.controller}/autocomplete/${column}/${name}`);
  }

  getByForeignkey(propertyName: string, value: number) {
    return this.http.get<T[]>(`${this.urlApi}/${this.controller}/getByForeignkey/${propertyName}/${value}`);
  }

}

interface ISuperService {
  getList(startIndex, pageSize, sortBy, sortDir): Observable<any>;
  get(controller: string);
  getOne(id, controller: string);
  post(o);
  put(id, o);
  delete(id);
}
