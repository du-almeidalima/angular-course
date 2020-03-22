import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {FeedbackMessage} from "../../shared/models/message-feedback";
import StatusMessage from "../../shared/status-message";
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

    if (this.isLoginMode) {
      //TODO: Implement Login
    } else {
      this.isLoading = true;
      this.authService.signUp(email, password)
        .subscribe(
          // Success
          data => {
            console.log(data);
            this.isLoading = false;
          },
          // Error
          (err: StatusMessage) => {
            console.error(err);
            // Setting FeedBackMessage for FeedBackMessage component
            this.feedbackMessage = {
              message: err.message,
              severity: MessageStatus.messageStatusToSeverity(err.status)
            };
            this.isLoading = false;
          }
        )
    }
  }

  public messageDismissHandler(): void {
    this.feedbackMessage = null;
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
