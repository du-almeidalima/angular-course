import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {FeedbackMessage} from "../../shared/models/message-feedback";
import {StatusMessage} from "../../shared/status-message";
import {MessageStatus} from "../../shared/enums/message-status.enum";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public isLoginMode = true;
  public isLoading = false;

  public footerMessage: [string, string] = ['New here?', 'Create an account'];
  public buttonMessage: string = 'Log In';
  public feedbackMessage: FeedbackMessage;

  constructor(private authService: AuthService) {
  }

  public changePage(): void {
    this.isLoginMode = !this.isLoginMode;
    this.footerMessage = this.isLoginMode ?
      ['New here?', 'Create an account'] :
      ['Already have an account?', 'Sign in'];
    this.buttonMessage = this.isLoginMode ?
      'Sign in' :
      'Sign up'
  }

  public handleFormSubmission(form: NgForm): void {
    if (form.invalid) {
      console.error('Form is invalid!');
      return;
    }
    const {email, password} = form.value;

    this.loginOrSignIn(email, password)
  }

  public messageDismissHandler(): void {
    this.feedbackMessage = null;
  }

  private loginOrSignIn(email: string, password: string): void {
    // Setting Spinner
    this.isLoading = true;

    this.authService.loginOrSignUp(email, password, this.isLoginMode)
      .subscribe(
        // Success
        (resData: any) => {
          console.log(resData);
          this.isLoading = false;
        },
        // Error
        (errData: StatusMessage) => {
          console.error(errData);
          // Setting FeedBackMessage for FeedBackMessage component
          this.feedbackMessage = {
            message: errData.message,
            severity: MessageStatus.messageStatusToSeverity(errData.status)
          };
          this.isLoading = false;
        }
      )
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
