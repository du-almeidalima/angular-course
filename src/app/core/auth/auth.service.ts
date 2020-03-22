import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponseData} from "../../shared/models/response-data.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MessageMapService} from "../../shared/services/message-map.service";
import StatusMessage from "../../shared/status-message";
import {MessageStatus} from "../../shared/enums/message-status.enum";

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
  private readonly AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly API_KEY = 'AIzaSyCpd5DSsqbLJfu6LL-7JIGzSaAGuwiVy_Y';

  constructor(private http: HttpClient, private messageMappingService: MessageMapService) {}

  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${this.AUTH_URL}?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errRes => {
          const errorCode = errRes?.error?.error?.message;

          // Checking if error message follows structure from Firebase API
          if (!errorCode) {
            return throwError(new StatusMessage('A different error message format was received from API', MessageStatus.ERROR));
          }
          return throwError(this.messageMappingService.mapMessage(errorCode));
         })
      )
  }
}
