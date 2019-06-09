import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // templateUrl: './servers.component.html',
  template: `
    <app-server></app-server>
    <app-server></app-server>
  `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


/** Another way of creating a component is through CLI = gn generate component [component name]
 * This will also automatically include this new component into app.component.ts => declarations: [ Components ]
 * @Component Requires a template / templateUrl
 */
