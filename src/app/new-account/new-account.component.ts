import {Component} from '@angular/core';
import {LogService} from '../services/log.service';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LogService]
})
export class NewAccountComponent {

  constructor(private logService: LogService, private accountService: AccountsService) {
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);

    // this.logService.logStatus(accountStatus);
  }
}

/** Basically for the AccountsService to work we need to stop instantiating a new instance of it here, but we still need it on the
 * constructor so Angular knows that it needs to inject something. Instead, we just remove it from the "providers" array,
 * that tells Angular to create a new instance for this class
 *
 * Note: We took off the LogService to use it inside another Service, the AccountService, that's only possible because we're instantiating
 * Them in the AppModule
 */

/**
 * Note that we added the:
 *
 *  this.accountService.statusUpdated.subscribe(
 *    (status: string) => alert('New Status: ' + status)
 *  );
 *
 * This is how we subscribe to listen to an specific event.
 * With that we achieved cross component communication!
 * We used a service to get this, a component calls a service for something, the service emitts an event and other component
 * listen/subscribe to it
 */
