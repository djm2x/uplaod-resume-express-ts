import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';
import { SessionService } from '../shared';
// import { SessionService } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  // public p: Observable<any>;
  // i = 0;
  cachedRequests: Array<HttpRequest<any>> = [];

  max = 0;
  percentage = 0;

  constructor(private loaderService: LoaderService, public router: Router
    , public snackBar: SnackBarService , private session: SessionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.requests.push(req);
    this.calculPercentage(this.requests.length);
    //

    //
    const o = new Observable(observer => {
      const reqAddedToken = req.clone({
        setHeaders: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${this.session.token}`,
          // Authorization: `${this.session.token}`,
        }
        // this.headers = new HttpHeaders({
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Bearer ' + this.accessToken
        // });
      });

      const s = next.handle(reqAddedToken).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
            this.snackBar.manageStatusCode(event.status);
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              // this.toast.toastError(err.status); // , err.statusText);
              // this.snackBar.notifyAlert(`${err.status}: ${err.statusText}`);
              console.log(err.status, err.statusText);
              // this.session.doSignOut();
              this.router.navigate(['/admin']);
              // this.snackBar.manageStatusCode(err.status);
            } else {
              // console.log(err);
              // this.toast.toastError(err.error);
              const er = err.error ? `${err.status}: ${err.error.Description}` : `${err.status}`
              this.snackBar.manageStatusCode(err.status);
              // this.snackBar.notifyAlert(er);
              // this.snackBar.openSnackBar(`${err.status} : ${err.error.Description}`);
            }
          }
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        s.unsubscribe();
      };
    });
    //
    return o as Observable<HttpEvent<any>>;
  }

  //


  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
      this.calculPercentage(this.requests.length);
    }
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  //


  calculPercentage(length: number) {
    if (length === 0) {
      this.percentage = 100;
      this.max = 0;
      this.loaderService.isLoading.next({isBegin: this.requests.length > 0, count: +this.percentage.toFixed(0)});
    } else {
      this.max = this.max > length ? this.max : length;
      this.percentage = 100 - ((length * 100) / this.max);
      this.loaderService.isLoading.next({isBegin: true, count: +this.percentage.toFixed(0)});
    }

    // console.log(length, this.percentage)
  }
}
