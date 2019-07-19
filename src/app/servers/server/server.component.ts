import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Remember, when getting something from the url it will always be a string
    const serverId: number = +this.route.snapshot.params['id'];

    this.server = this.serversService.getServer(serverId);

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+ params.id);
    });
  }

  public onEditNavigate() {
    this.router.navigate(
      ['edit'],
      {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      });
  }
}

/**
 * In our use case, we have a query parameter on the ulr when this component is loaded, once we click on "Edit Server" and
 * navigate to the EditServerComponent we loose those query parameters!
 *
 * We can keep them using:
 * - queryParamsHandling: 'preserve' . This override the default behaviour that is drop the params
 * 'preserve' is fine when you don't add any new ones, but if we do, then 'merge' is a better solution
 *
 * "preserveQueryParams" is deprecated, don't use
 */
