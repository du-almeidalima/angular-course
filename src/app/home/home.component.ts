import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onLoadServers(id: number) {
    // Complex calculation
    setTimeout(() => {

      // Navigating to specific server
      this.router.navigate(['/servers', id, 'edit'],
        {queryParams: {allowEdit: '1'}, fragment: 'loading'});

    }, 1500);
  }
}

/**
 * Here, to navigate to somewhere else from a TS file one could make use of the Router. By injecting it to the constructor
 * the Router method navigate can travel to another component listed in the routers array
 *
 * the "navigate" returns a promise that is executed when the url has ben loaded
 */

/**
 * To add query parameters programmatically we just add the [queryParams] object to the navigate method as a second argument
 * The same gos to [fragment]
 */
