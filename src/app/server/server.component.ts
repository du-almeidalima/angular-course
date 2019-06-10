import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  public serverId = 10;
  public serverStatus = 'Offline';

  public getServerStatus() {
    return this.serverStatus;
  }
}
