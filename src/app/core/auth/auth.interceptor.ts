import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userAuthObservable
      .pipe(
        take(1),
        // Swapping the userAuthObservable for the request Observable
        exhaustMap(user => {
          // Checking the user has already logged in
          if (!user){
            return next.handle(req);
          }
          const requestWithToken = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(requestWithToken);
        })
      );
  }
}
