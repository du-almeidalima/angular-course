import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {AuthResponseData} from "../../shared/models/firebase/response-data.model";
import {MessageMapService} from "../../shared/services/message-map.service";
import {StatusMessage} from "../../shared/status-message";
import {MessageStatus} from "../../shared/enums/message-status.enum";
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

  private userSubject = new Subject<User>();
  constructor(private http: HttpClient, private messageMappingService: MessageMapService) {}

  public loginOrSignUp(email: string, password: string, isLogin: boolean): Observable<AuthResponseData> {
    const authUrl = isLogin
    ? `${this.LOGIN_URL}?key=${this.API_KEY}`
    : `${this.SIGN_IN_URL}?key=${this.API_KEY}`;

    return this.http
      .post<AuthResponseData>(authUrl,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        ))
      )
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorCode = errorRes?.error?.error?.message;

    // Checking if error message follows structure from Firebase API
    return errorCode
      ? throwError(this.messageMappingService.mapMessage(errorCode))
      : throwError(new StatusMessage('A different error message format was received from API', MessageStatus.ERROR))
  }

  private handleAuthentication(email: string, id:string, token: string, expiresIn: number) {
    const expirationDate = new Date().getTime() + (expiresIn * 1000);
    const user = new User(
      email,
      id,
      token,
      new Date(expirationDate)
    );
    this.userSubject.next(user);
  }
}
