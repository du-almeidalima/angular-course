import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  // Just injecting our fake authService that will simulate an server authentication
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isAuthenticated()
      .then((res: boolean) => {
        if (res) {
          return true;
        } else {
          console.log(`You don't have access! \n Your auth status: ${this.authService.loggedIn}`);
          this.router.navigate(['/']).then(() => false);
        }
      });
  }
}

/**
 * This will be our guard! a piece of code that will get executed before entering in a route or when leaving it. We can use it to manage
 * authorizations
 */

/**
 * Those arguments we require in "canActivate" function are going to be provided by Angular, because it's it who execute this code, so it
 * will give us this data.
 *
 * As for the return values, we're defining what this function can return. It can run Async (Observable, Promise) or Sync (boolean).
 * In this use case, this service will contact another service (Fake) that will return if the user is loggedIn or not. With that, our
 * AuthGuard will block or allow the access.
 *
 * So in auth.service.ts we created a method that just returns a new promise with the actual status(boolean) of the user. with that, if the
 * status is true we return true, and if not, the we will navigate the user away, because they shouldn't have access to it. And to do that,
 * we use the Router module that we've learned to navigate programmatically!
 *
 * Everything implemented! now we need to apply it to the AppModule. For that, we need to define which route or routes should be protected
 * by this guard! In our case the Servers routes!
 */
