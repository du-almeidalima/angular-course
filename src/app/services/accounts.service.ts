export class AccountsService {

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  addAccount(name: string, status: string): void {
    this.accounts.push({name, status});
  }

  statusChange(id: number, newStatus: string): void {
    this.accounts[id].status = newStatus;
  }

}

// In this service we will take care of the accounts, so it'll be a Data Service

/** On lesson 107 we created this service and injected it into every component, but there is a problem with instances, Angular only
 * propagate the same instance to the child components, take a look on README to understand the Hierarchical Injector concept
 *
 * What's happening is, we're providing this service to AppComponent, and this one is providing the same instance to its
 * children (NewAccountComponent and AccountsService), but we're overwriting it into those components by instantiating it again!
 */
