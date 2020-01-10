import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f', {static: false})
  private formRef: NgForm;

  public defaultSecretSelect = 'teacher';
  public answer: string;
  public genders = ['male', 'female'];

  public onSubmit(form: NgForm): void {
    console.log(form);
  }

  public suggestUser() {

    this.formRef.form.patchValue(
      {userData: {
        username: 'Duduzinho'
        }
      }
    );
  }
}

/*
  Imagine we wanted a button that would suggest a user when clicked, fulfilling the forms fields, we can do that by some approaches:

  1° - ngForm.setValue() : Takes a object with the exact form fields and sets all of them into the form;
      this.formRef.setValue({
        userData: {
          username: 'Duzinho',
          email: 'duzinho@gmail.com'
        },
        answer: '',
        secret: 'teacher',
        gender: 'female'
      });

  2° - ngForm.form.patchValue() : Takes a object with the location of what field to change
 */
