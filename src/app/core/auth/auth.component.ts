import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public isLoginPage = true;
  public footerMessage: [string, string] = ['New here?', 'Create an account'];
  public buttonMessage: string = 'Log In';

  public changePage(): void {
    this.isLoginPage = !this.isLoginPage;
    this.footerMessage = this.isLoginPage ?
      ['New here?', 'Create an account'] :
      ['Already have an account?', 'Log in'];
    this.buttonMessage = this.isLoginPage ?
      'Sign up':
      'Register'
  }

  public handleFormSubmission(form: NgForm): void {
    console.log(form)
  }
}

/*
 * == AUTHENTICATION ==
 * This app authentication is managed by Firebase Authentication, it uses the "Email/Password" combination. When this is
 * enabled, we can get access to Users/Authentication endpoints.
 * More info (https://firebase.google.com/docs/reference/rest/auth)
 *
 *
 */
