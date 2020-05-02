import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {AuthService} from "./auth.service";
import {ResponseMessage} from "../../shared/models/response-message.model";
import {FeedbackMessageComponent} from "../../shared/components/feedback-message/feedback-message.component";
import {PlaceholderDirective} from "../../shared/directives/placeholder.directive";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy, OnInit{
  public isLoginMode = true;
  public isLoading = false;

  public footerMessage: [string, string] = ['New here?', 'Create an account'];
  public buttonMessage: string = 'Log In';

  @ViewChild(PlaceholderDirective)
  public messageFeedbackHost: PlaceholderDirective;
  private messageFeedbackSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      if (authState.authError) {
        this.showErrorFeedBackMessage(authState.authError)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.messageFeedbackSubscription) {
      this.messageFeedbackSubscription.unsubscribe();
    }
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

    this.loginOrSignIn(form.value.email, form.value.password)
  }

  private loginOrSignIn(email: string, password: string): void {
    // Setting Spinner
    this.isLoading = true;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email, password}))
    }
    else {
      // this.authService.loginOrSignUp(email, password, this.isLoginMode)
      //   .subscribe(
      //     // Success
      //     (resData: any) => {
      //       console.log(resData);
      //       this.isLoading = false;
      //       this.router.navigate(['/recipes'])
      //     },
      //     // Error
      //     (errData: ResponseMessage) => {
      //       // Setting FeedBackMessage for FeedBackMessage component
      //       this.showErrorFeedBackMessage(errData);
      //       this.isLoading = false;
      //     }
      //   )
    }
  }

  private showErrorFeedBackMessage(errData: ResponseMessage) {
    // Firstly we need to inject ComponentFactoryResolver to create a componentFactory of a given Component
    // With the ComponentFactory we can then start to create components
    const feedbackMessageComponentFactory = this.componentFactoryResolver
      .resolveComponentFactory(FeedbackMessageComponent);
    // Now we have a factory, we need a ViewContainerRef instance to place the Component, but for grabbing it and
    // exposing it to use, we need first to set a place in the template and expose this ViewContainerRef, for that a
    // Directive (PlaceholderDirective) was created, that grab this <ng-template> and expose ViewContainerRef to us.
    const hostViewContainerRef = this.messageFeedbackHost.elementRef;
    hostViewContainerRef.clear();
    const feedBackMessageCompRef = hostViewContainerRef.createComponent(feedbackMessageComponentFactory);

    // Adding the @Inputs
    feedBackMessageCompRef.instance.message = errData;

    // Subscribing to @Output manually
    this.messageFeedbackSubscription = feedBackMessageCompRef.instance.messageDismiss
      .subscribe(() => {
        this.messageFeedbackSubscription.unsubscribe();
        hostViewContainerRef.clear();
      })
  }
}

/*
 * == AUTHENTICATION ==
 * This app authentication is managed by Firebase Authentication, it uses the "Email/Password" combination. When this is
 * enabled, we can get access to Users/Authentication endpoints.
 * More info (https://firebase.google.com/docs/reference/rest/auth)
 */

/*
 * Creating Components Manually/Programmatically
 * Before the use of *NgIf was made to display a component or not by assigning the errorResponse to a variable and then
 * passing it to the FeedbackMessageComponent
 *        // this.feedbackMessage = {
          //   message: errData.message,
          //   severity: MessageStatus.messageStatusToSeverity(errData.status)
          // };
 *
 * Now we're going to create it Programmatically, as show above
 * @see https://angular.io/guide/dynamic-component-loader
 */
