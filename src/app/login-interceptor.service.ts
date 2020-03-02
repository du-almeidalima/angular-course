import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import log from './common/help';

export class LoginInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    log('LOGIN_INTERCEPTOR >> Request Intercepted', 'pink');
    return next.handle(req);
  }
}
