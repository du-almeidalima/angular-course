import {Component, Input} from '@angular/core';
import {LogService} from '../services/log.service';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LogService, AccountsService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private logService: LogService, private accountService: AccountsService) {}

  onSetTo(status: string) {
    this.accountService.statusChange(this.id, status);

    this.logService.logStatus(status);
  }
}
