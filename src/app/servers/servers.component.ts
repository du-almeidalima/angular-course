import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  public allowServers = false;
  public serverCreationStatus = 'No server was created';

  constructor() {
    setTimeout(() => {
      this.allowServers = true;
    }, 4000);
  }

  ngOnInit() {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created!';
  }
}

/**
 * onCreateServer = Just a regular function, it's a good practice to name with the prefix "on" functions that will be called from a template
 */
