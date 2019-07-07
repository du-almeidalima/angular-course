import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../services/user-manager.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  private activeUsers: string[];

  constructor(private userService: UserManagerService) {}

  ngOnInit(): void {
    this.activeUsers = this.userService.activeUsers;
  }

  private inactiveUser(id: number): void {
    this.userService.inactiveUser(id);
  }
}

/**
 * First we get the instance of UserManagerService and then we link our users to the one hold in the UserManagerService (activeUsers)
 */
