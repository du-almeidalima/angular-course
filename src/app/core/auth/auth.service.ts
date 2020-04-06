import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {AuthResponseData} from "../../shared/models/firebase/response-data.model";
import {StatusMessage} from "../../shared/status-message";
import {MessageStatus} from "../../shared/enums/message-status.enum";
import {MessageMapService} from "../../shared/services/message-map.service";
import {User} from "../../shared/models/user.model";


/**
 * @author Eduardo Lima
 *
 * @description Class responsible for doing User Authentication. it communicates with FireBase Authentication API.
 * It uses the MessageMapService to parse the message code form Firebase into User friendly message.
 * @see @link {MessageMapService}
 *
 * [Firebase REST Authentication API]{@link https://firebase.google.com/docs/reference/rest/auth#section-create-email-password}
 *
 */
@Injectable({providedIn: "root"})
export class AuthService {
  private readonly SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private readonly API_KEY = 'AIzaSyCpd5DSsqbLJfu6LL-7JIGzSaAGuwiVy_Y';

  private _userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  get userAuthObservable(): Observable<User> {
    return this._userSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageMapService: MessageMapService) {}

  public loginOrSignUp(email: string, password: string, isLogin: boolean): Observable<AuthResponseData> {
    const authUrl = isLogin ? `${this.LOGIN_URL}` : `${this.SIGN_IN_URL}`;

    return this.http
      .post<AuthResponseData>(authUrl,
        {
          email,
          password,
          returnSecureToken: true
        },
        {
          params: new HttpParams().set('key', this.API_KEY)
        }
      )
      .pipe(
        catchError(err => {
          return this.handleError(err)
        }),
        tap(resData => this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        ))
      )
  }

  public autoLogin(): void {
   const restoredUser = JSON.parse(localStorage.getItem('userData'));

    if (restoredUser){
      const {email, id, _token, _tokenExpirationDate} = restoredUser;
      const user = new User(email, id, _token, new Date(_tokenExpirationDate));

      // Checking if token is still valid (check User class)
      if (user.token){
        this._userSubject.next(restoredUser);
        // Starting Session countdown
        this.autoLogout(new Date(_tokenExpirationDate).getTime() - new Date().getTime())
      } else {
        console.info(`User token has expired.`);
      }
    } else {
      console.info(`Couldn't find any user to auto login.`);
    }
  }

  public autoLogout(expirationDuration: number): void {
    console.info(`Session expires in: ${((expirationDuration / 1000) / 60).toFixed(0)} minutes`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  public logOut() {
    this._userSubject.next(null);
    this.router.navigate([''])
      .then(() => {
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
        console.log(`User logged out at: ${new Date().toLocaleString()}`)
      });
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorCode = errorRes?.error?.error?.message;
    console.error(errorRes);

    // Checking if error message follows structure from Firebase API
    return errorCode
      ? throwError(this.messageMapService.mapMessage(errorCode))
      : throwError(new StatusMessage('A different error message format was received from API', MessageStatus.ERROR))
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date().getTime() + (expiresIn * 1000);
    const user = new User(
      email,
      id,
      token,
      new Date(expirationDate)
    );
    this._userSubject.next(user);

    // Storing in localStorage so the user can access it when the page refreshes.
    localStorage.setItem('userData', JSON.stringify(user));
    // Starting Session countdown
    this.autoLogout(expiresIn * 1000)
  }
}

/*
 * The
 *  - private _userSubject = new Subject<User>();
 * was changed to
 *  - private _userSubject = new BehaviorSubject()<User>();
 *
 * Because in AuthInterceptor we would required the token whenever we want, and not when the value of the subject chan-
 * ged. Hence, we use the BehaviourSubject which allows that.
 */
