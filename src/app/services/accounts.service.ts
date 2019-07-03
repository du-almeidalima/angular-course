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
