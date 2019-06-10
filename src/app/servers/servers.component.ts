import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  public allowServers = false;
  public serverCreationStatus = 'No server was created';
  public serverName: string;
  public serverCreated: boolean;
  public servers = [];

  constructor() {
    this.serverCreated = false;
    this.servers.push('Server 1', 'Server 2');

    setTimeout(() => {
      this.allowServers = true;
    }, 4000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = `Server: ${this.serverName} was created!`;
    this.servers.push(`Server ${this.servers.length + 2}`);
  }

  onUpdateServerName(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}


/**
 * To be able to add servers dynamically, we could assign the servers to a component property array and then just 'push' it when the user
 * adds a new server. and in the template we could use the "ngFor" structural directive to print those servers.
 */
