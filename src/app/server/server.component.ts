import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  public serverId = 10;
  public serverStatus: string;

  constructor() {
    // Dynamically creating the status
    this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
  }

  public getServerStatus() {
    return this.serverStatus;
  }

  public getColor() {
    return this.serverStatus === 'Online' ? 'green' : 'red';
  }
}
