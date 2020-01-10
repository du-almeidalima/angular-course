import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public subscriptionValues = [
    {value: 'noob', description: 'Noob'},
    {value: 'advanced', description: 'Advanced'},
    {value: 'pro', description: 'Pro'}
  ];
  public defaultSubscription = 'advanced';

  public formSub = {
    submitted: false,
    values: {
      email : '',
      subscription: '',
      password: ''
    }
  };

  public onFormSubmission(form: NgForm): void {
    this.formSub.values.email = form.value.email;
    this.formSub.values.subscription = form.value.subscription;
    this.formSub.values.password = form.value.password;
  }
}
