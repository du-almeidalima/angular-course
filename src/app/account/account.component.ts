import {Component, Input} from '@angular/core';
import {LogService} from '../services/log.service';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LogService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private logService: LogService, private accountService: AccountsService) {}

  onSetTo(status: string) {
    this.accountService.statusChange(this.id, status);

    // this.logService.logStatus(status);
  }
}

/** Basically for the AccountsService to work we need to stop instantiating a new instance of it here, but we still need it on the
 * constructor so Angular knows that it needs to inject something. Instead, we just remove it from the "providers" array,
 * that tells Angular to create a new instance for this class
 *
 * Note: We took off the LogService to use it inside another Service, the AccountService, that's only possible because we're instantiating
 * Them in the AppModule
 */
