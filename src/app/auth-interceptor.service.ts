import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export default class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // In here, we can do all sort of things, like check the URL and block the request, and so on...
    console.log('Original Request: ' + req);
    console.log('Request is on its way');

    // Appending a new header
    const modifiedRequest = req.clone({headers: req.headers.append('Auth-Token', 'someCrazy123Value')});

    // Sending the modified request
    return next.handle(modifiedRequest);
  }
}

/*
 * For our interceptor work, we need to implement the HttpInterceptor interface
 * This interface requires to implement the "intercept" method, in this method we get the:
 *  - req: HttpRequest<any>: Our current request with all its properties
 *  - next: HttpHandler: Which we can use to forward the request we pass in
 *
 * To provide it to our app to use is a little different, we need to add in our ".module", in @NgModule object, another object("providers"),
 * which will be an array of objects, of our providers(services), and pass an object, defining our service, in this case, our
 * interceptor, with the keys:
 *  providers: [
 *    ...
 *    {
 *      provide: HTTP_INTERCEPTORS,
 *      useClass: AuthInterceptorService (the interceptor),
 *      multi: true / false (when having multiple interceptors)
 *    }
 * ]
 *
 * This in the end, is a way to register a service valid to Dependency Injection, with some metadata or tokens.
 */

/*
 * Manipulating Request Objects
 *
 * The original req is immutable, but we can clone and change the clone how we want.
 */
