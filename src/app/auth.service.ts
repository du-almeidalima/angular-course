import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  public loggedIn = false;

  public isAuthenticated(): Promise<boolean> {

    return new Promise(((resolve, reject) => {

      // Faking the server delay
      setTimeout(() => {

        resolve(this.loggedIn);

      }, 1000);
    }));
  }

  public login() {
    this.loggedIn = true;
  }

  public logout() {
    this.loggedIn = false;
  }
}

/**
 * This service is to fake an auth service, in the method isAuthenticated we will simulate a request to a server. All of this to test our
 * AuthGuard Service which will handle this async code.
 */
