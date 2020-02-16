import { Component } from '@angular/core';
import {SortByPipe} from './pipes/sortBy.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public appStatus = new Promise( (resolve => {
      setTimeout(() => {
        resolve('Stable');
      }, 2000);
    })
  );

  constructor(private orderPipe: SortByPipe) {
  }
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
      status: 'offline',
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
    });

    const test = this.orderPipe.transform(this.servers, 'started');
    console.log(test);
  }
}
