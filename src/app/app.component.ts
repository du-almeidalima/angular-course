import {Component, OnInit} from '@angular/core';
import {AccountsService} from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent implements OnInit {

  public accounts: {name: string, status: string}[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }
}

/** All the logic was basically taken from AppComponent and thrown into AccountsService.
 * Now, the AppComponent will only have a empty array of accounts
 * And we will INJECT the accounts service into this component constructor
 *
 * NOTE: Since the "accounts" is an array/object in the AccountsService it becomes a reference type every time we passes it into a variable
 * So if we pass it into a property of AppComponent, it's in fact, referring to the AccountsService array.
 */
