import {Component} from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: ['.purplerise{ color: purple;}']
})
export class PasswordComponent {

  public logs = [];
  public showPassword = false;

  public onPasswordCheckClick() {
    this.showPassword = !this.showPassword;
    this.logs.push(this.logs.length + 1);
  }
}
