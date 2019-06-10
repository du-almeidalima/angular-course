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

  constructor() {
    this.serverCreated = false;

    setTimeout(() => {
      this.allowServers = true;
    }, 4000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = `Server: ${this.serverName} was created!`;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}

