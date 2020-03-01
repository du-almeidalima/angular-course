import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

const consoleCss = `
  border: 1px solid blue;
  border-radius: 5px;
  padding: 3px;
  color: black;
  background-color: darkgray;
`;

const log = word => {
  const parsedWord = '%c' + word;
  console.log(parsedWord, consoleCss);
};

export default class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // In here, we can do all sort of things, like check the URL and block the request, and so on...
    log('AUTH_INTERCEPTOR >> Entered Interceotir');

    // Appending a new header
    const modifiedRequest = req.clone({headers: req.headers.append('Auth-Token', 'someCrazy123Value')});

    // Sending the modified request and tapping the Response
    return next.handle(modifiedRequest)
      .pipe(
        tap(event => {
          log('AUTH_INTERCEPTOR >> Request Intercepted');

          if (event.type === HttpEventType.Response) {
            log('AUTH_INTERCEPTOR >> Response Intercepted: ');
            console.log(event.body);
          }
        })
      );
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

/*
 * Response Interceptors
 *
 * If we wanted to do something with the response of this interceptor, we could actually call .pipe() on it, because in the end, the return
 * from .handle is an Observable.
 *
 * No that, we'll always receive the "event" object from this request, not the "body" neither "response", so we have all the data possible.
 */
