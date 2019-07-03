import {Component} from '@angular/core';
import {LogService} from '../services/log.service';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LogService, AccountsService]
})
export class NewAccountComponent {

  constructor(private logService: LogService, private accountService: AccountsService) { }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);

    this.logService.logStatus(accountStatus);
  }
}
