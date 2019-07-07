import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../services/user-manager.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  private inactiveUsers: string[];

  constructor(private userService: UserManagerService) {}

  ngOnInit(): void {
    this.inactiveUsers = this.userService.inactiveUsers;
  }

  private activeUser(id: number): void {
    this.userService.activeUser(id);
  }
}

/**
 * First we get the instance of UserManagerService and then we link our users to the one hold in the UserManagerService (activeUsers)
 */

