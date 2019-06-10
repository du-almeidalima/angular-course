import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {

  public resetStatusBtn: boolean;
  public name: string;

  constructor() {
    this.name = '';
    this.resetStatusBtn = false;
  }

  public onUserInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    console.log(value.length);
    value.length > 0 ? this.resetStatusBtn = true : this.resetStatusBtn = false;
  }

  public onResetButtonClick() {
    this.name = '';
    this.resetStatusBtn = false;
  }
}
