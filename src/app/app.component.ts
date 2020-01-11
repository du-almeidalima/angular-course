import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public genders = ['male', 'female'];
  public userForm: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl('male'),
    });
  }
}

/* REACTIVE APPROACH
 *
 * In the Reactive Approach (RA) the form is created programmatically (Ts).
 * We can use the FormGroup (@angular/forms) to create our form, this class has lot's of helpful methods to deal with forms.
 * In TD approach, Angular was also doing this, but based on the <form> element in template.
 * To work with Reactive Forms we need to replace the FormsModule(TD) to ReactiveFormsModule in our Module.
 *
 * To initialize our form we need to pas an instance of "FormGroup" to the [formGroup] directive in our <form> element.
 * For that instance, we need to provide a JS Object with our form controls, as if we were registering it.
 *  new FormGroup({ controls...});
 *  OBS: In the course Max said we could wrap our controls Object into quotation marks to prevent them from changing when code is minified.
 *
 * To create our controls we can instantiate the class FormControl().
 * As arguments, We can pass:
 * - formState: the initial value of this control
 * - validator: single validator or an array
 * - asyncValidator: a async validator
 */
