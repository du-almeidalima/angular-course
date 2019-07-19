import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  private server: {id: number, name: string, status: string};
  private allowEdit: boolean;
  private serverName = '';
  private serverStatus = '';

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.route.queryParams);
    // console.log(this.route.fragment);
    //
    // this.route.queryParams.subscribe(
    //   (queryParams: Params) => {
    //     console.log(queryParams);
    //   }
    // );
    //
    // this.route.fragment.subscribe(
    //   (fragment: string) => {
    //     console.log(fragment);
    //   }
    // );

    // Getting value from Route URL
    const serverId = + this.route.snapshot.params['id'];
    this.route.queryParams
      .subscribe((queryP: Params) => {
        this.allowEdit = queryP.allowEdit === '1';
    });

    this.server = this.serversService.getServer(serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}

/**
 * We can get access to "queryParams" and "fragments" by using the ActivatedRoute, the same we use for router params.
 * with the ActivatedRoute injected, we can retrieve it, just like with the router params, in 2 ways:
 * - For component initialization: this.route.snapshot.queryParams / .fragment
 * - For changes in the same component using the observable, like demonstrated above with "queryParams" and "fragment"
 */

/**
 * Using Query Parameters - Practice
 *
 * Here we're getting the "allowEdit" on query params and setting if the user can click or not on the update button
 */

