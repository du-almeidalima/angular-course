import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public genders = ['male', 'female'];
  public userForm: FormGroup;

  public get usernameControl(): AbstractControl {
    return this.userForm.get('userData.username');
  }

  public get emailControl(): AbstractControl {
    return this.userForm.get('userData.email');
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('male'),
    });
  }

  onFormSubmit(): void {
    console.log(this.userForm);
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
 *
 * After creating our "FormGroup" and ours "FormControl" we need to connect/sync the HTML and Form/Template.
 * By default Angular detects a <form> tag and creates a Form for it, to overwrite this we need to assign our TS FormGroup to the <form>
 * in template. With that, Angular won't create/infer a FormGroup it will use ours! To do that:
 *    [formGroup] => <form [formGroup]="userForm">
 * But we still need to connect the Template Controls to the controls "FormControls" we've created, for that we have another directive:
 *    formControlName => <input formControlName="username" class="u-full-width" type="text" placeholder="John..." id="username">
 *
 * === SUBMITTING THE FORM ===
 * Contrary to the Template Driven approach, where we'd need to pass the form as a Template Reference from the Angular auto creation
 * "ngForm". Here we already have the form in our code! just use it.
 *
 * === VALIDATIONS ===
 * We can apply validations to our forms controls by passing it as a single or an array in second and third arguments for the
 * FormControl constructor:
 *
 *    new FormControl(null, Validators.required)
 *    new FormControl(null, [Validators.required, Validators.email])
 *
 * Angular will execute the validator whenever it detects that the control has changed.
 * To access the controls we can use the FormGroup.get('nameOfControl')
 *
 * === GROUPING CONTROLS ===
 * Like in Template Driven approach, we can use FormGroups to group our controls, but notice that using a FormGroup will change the path to
 * ours controls!
 *
 *    userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      })
 *
 * Also whenever we add a FormGroup we need to reflect this in our template, wrapping the controls in the FormGroup with a elements that has
 * the formGroupName directive:
 *    <div class="row" formGroupName="userData">
 *      <input formControlName="username" ... >
 *      <input formControlName="email" ... >
 *   </div>
 */
