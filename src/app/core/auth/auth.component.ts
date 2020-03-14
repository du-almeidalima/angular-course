import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public isLoginMode = true;
  public footerMessage: [string, string] = ['New here?', 'Create an account'];
  public buttonMessage: string = 'Log In';

  constructor(private authService: AuthService) {}

  public changePage(): void {
    this.isLoginMode = !this.isLoginMode;
    this.footerMessage = this.isLoginMode ?
      ['New here?', 'Create an account'] :
      ['Already have an account?', 'Sign in'];
    this.buttonMessage = this.isLoginMode ?
      'Sign in':
      'Sign up'
  }

  public handleFormSubmission(form: NgForm): void {
    if (form.invalid) {
      console.error('Form is invalid!');
      return;
    }
    const {email, password} = form.value;

    if (this.isLoginMode) {
      //TODO: Implement Login
    } else {
      this.authService.signUp(email, password)
        .subscribe(
          data => {
            console.log(data)
          },
          err => {
            console.error(err)
          }
        )
    }
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
