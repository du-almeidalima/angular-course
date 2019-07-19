import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string, allowEdit: string}[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  public onReloadPage() {
    this.router.navigate(['/servers'], {relativeTo: this.route});
  }
}

/** In this component we're using relative path and it's not throwing an error like using relative paths in RouterLink ( which would add,
 * the path to the url), what happens is, when the Router is used programatically, it doesn't know where it's sitting on, to tell this, one
 * can pass a second parameter, and assign that it's relativeTo.
 *
 * One can get the route that this component is relative to by using the ActivatedRoute.
 *
 * ActivatedRoute inject the route this component is loaded, and have a lot of meta data about this
 */

