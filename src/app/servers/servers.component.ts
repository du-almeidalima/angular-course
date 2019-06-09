import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-servers',
  // selector: 'app-servers' <- Element selector,
  // selector: '[app-servers] <- Attribute selector',
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
 * @Component Requires a template /
 *
 * The "selector" property works just like a CSS selector, if you go to app.component.html you can see we can select it through various ways
 * Note: Angular don't allow the usage of ID to select an element
 */
