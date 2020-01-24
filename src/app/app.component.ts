import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public form: FormGroup;
  private projectStatusArray = [
    {
      key: 'STABLE',
      description: 'Stable'
    },
    {
      key: 'CRITICAL',
      description: 'Critical'
    },
    {
      key: 'FINISHED',
      description: 'Finished'
    }
  ];

  // FormControl Getters
  public get projectName(): AbstractControl { return this.form.get('projectName'); }
  public get email(): AbstractControl { return this.form.get('email'); }
  public get projectStatus(): AbstractControl { return this.form.get('projectStatus'); }

  public onSubmit(): void {
    console.log(this.form.controls);
  }

  ngOnInit(): void {

    // Setting the form
    this.form = new FormGroup({
      projectName: new FormControl(null, [Validators.required, this.validProjectName]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.checkEmail
      ),
      projectStatus: new FormControl(this.projectStatusArray[0].key)
    });
  }

  // Validators
  private validProjectName(control: FormControl): {[k: string]: any} {
    return (control.value === ('test')) ||  (control.value === ('Test')) ?
      { projectNameForbidden: true } :
      null;
  }

  private checkEmail(control: FormControl): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailForbidden: true });
        }

        return resolve(null);
        }, 800);
    });
  }

  log(a) {
    console.log(a);
  }
}
