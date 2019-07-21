import { Component } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  onLoginClick(): void {
    this.authService.login();
  }

  onLogoutClick(): void {
    this.authService.logout();
  }
}
