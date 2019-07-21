import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanComponentDeactivate} from '../../can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})

// This interface ensures that our component is compliant with "CanDeactivate" interface when the router calls 'canDeactivate" method
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  private server: {id: number, name: string, status: string};
  private allowEdit: boolean;
  private changesSaved = false;
  private serverName = '';
  private serverStatus = '';

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

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
    // Validating the changes and navigating up
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if (!this.changesSaved && (this.server.status !== this.serverStatus || this.server.name !== this.serverName)) {
      return confirm('There are some changes not saved, do you really want to leave?');
    } else {
      return true;
    }

  }

  // Here we're validating if the user is allowed to be on this page, if the user has some changes not saved or if the content of the fields
  // Is different from what is on the server
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

/**
 * Controlling Navigation with canDeactivate
 *
 * In the last lesson we've learned how to control access of routes with canActivate
 * Now, we're going to implement a control of leaving access with canDeactivate.
 * Whenever the user changes something and tries to leave the page without "updating" it we're going to ask if he is sure of leaving.
 * If the user do change something we're going to navigate back 1 lvl.
 *
 * The tricky part is, Validating if the user changed something and ask him if he wants to leave it's something that should be done in this
 * component, because we will check if the "changesSaved" is true, but a Guard must always be a service
 */

