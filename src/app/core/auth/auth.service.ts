import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponseData} from "../../shared/models/response-data.model";
import {Observable} from "rxjs";

/**
 * @author Eduardo Lima
 *
 * @description Class responsible for doing User Authentication. it communicates with FireBase Authentication API.
 *
 * [Firebase REST Authentication API]{@link https://firebase.google.com/docs/reference/rest/auth#section-create-email-password}
 *
 */
@Injectable({providedIn: "root"})
export class AuthService {
  private readonly AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly API_KEY = 'AIzaSyCpd5DSsqbLJfu6LL-7JIGzSaAGuwiVy_Y';

  constructor(private http: HttpClient) {}

  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.AUTH_URL}?key=${this.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
  }
}
