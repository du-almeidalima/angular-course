import {Component} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  template: `
    <ng-content *ngIf="isLogged; then loggedIn; else loggedOut" ></ng-content>

    <ng-template #loggedIn>
      <h3 id="messageTitle">Welcome Back {{user.name}}</h3>
      <p>Your email: {{user.email}}</p>
    </ng-template>

    <ng-template #loggedOut>
      <h3 id="messageTitle">User not Logged in</h3>
    </ng-template>

    <button (click)="logIn(1)">Login</button>
  `,
  providers: [UserService]
})
export class UserComponent {
  public user: User = null;
  public isLogged = false;
  public getAsync = false;

  constructor(private userService: UserService) {}

  logIn(id: number): void {
    if (this.getAsync) {
      this.userService.getAsyncUserById(id)
        .subscribe(user => {
          this.handleLogin(user);
        });
    } else {
      const user = this.userService.getSyncUser(id);
      this.handleLogin(user);
    }
  }

  handleLogin(user: User): void {
    if (user) {
      this.isLogged = true;
      this.user = user;
    }
  }
}

export interface User {
  name: string;
  email: string;
  id: number;
}
