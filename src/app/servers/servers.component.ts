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

  constructor() {
    setTimeout(() => {
      this.allowServers = true;
    }, 4000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = `Server: ${this.serverName} was created!`;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}

/**
 * We can pass a "event" just like JavaScript, but since TypeScript a typed "language" we need to specify which element this even will be.
 * We can do it by "casting" the event to a element (<HTMLInputElement>event.target).value
 * Or We can assert it as shown above
 *
 * Read more of Assertions and Casting on https://basarat.gitbooks.io/typescript/docs/types/type-assertion.html
 */
