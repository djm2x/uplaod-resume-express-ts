import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<{isBegin: boolean, count: number}>({isBegin: false, count: 0});
  public progress: number;
  constructor() {
  }
}
