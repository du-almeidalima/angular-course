import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponseData} from "../../shared/models/response-data.model";

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
  private readonly AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private readonly API_KEY = 'AIzaSyCpd5DSsqbLJfu6LL-7JIGzSaAGuwiVy_Y';

  constructor(private http: HttpClient) {}

  public signup(email: string, password: string): void {
    this.http.post(`${this.AUTH_URL}?key=${this.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .subscribe((resp: AuthResponseData) => {
      console.log(resp)
    })
  }
}
