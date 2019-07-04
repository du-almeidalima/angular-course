import {Component} from '@angular/core';
import {LogService} from '../services/log.service';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LogService]
})
export class NewAccountComponent {

  constructor(private logService: LogService, private accountService: AccountsService) { }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);

    this.logService.logStatus(accountStatus);
  }
}

/** Basically for the AccountsService to work we need to stop instantiating a new instance of it here, but we still need it on the
 * constructor so Angular knows that it needs to inject something. Instead, we just remove it from the "providers" array,
 * that tells Angular to create a new instance for this class
 */
