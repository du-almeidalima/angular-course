import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public filterCondition: string;

  public servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 2, 2020)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 2, 2020)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 2, 2020)
    },
    {
      instanceType: 'small',
      name: 'Quality Server',
      status: 'stable',
      started: new Date(15, 2, 2020)
    },
    {
      instanceType: 'medium',
      name: 'Testing Environment Server',
      status: 'offline',
      started: new Date(15, 2, 2020)
    }
  ];

  public getStatusClass(status: string): string {
    switch (status) {
      case 'stable': return 'list-group-item-success';
      case 'offline': return 'list-group-item-warning';
    }
  }

  public onAddServer(): void {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'offline',
      started: new Date(15, 2, 2020)
    })
  }
}
