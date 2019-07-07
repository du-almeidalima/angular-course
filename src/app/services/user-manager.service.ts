import {Injectable} from '@angular/core';
import {ChangeCounterService} from './change-counter.service';

@Injectable()
export class UserManagerService {

  public activeUsers = ['JoeJoe', 'Bunny'];
  public inactiveUsers = ['Mary', 'John'];

  constructor(private changeCounterService: ChangeCounterService) {}

  // Methods
  public activeUser(id: number): void {

    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);

    this.changeCounterService.userStatusChanged('activated');
  }

  public inactiveUser(id: number): void {

    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);

    this.changeCounterService.userStatusChanged('inactivated');
  }
}
