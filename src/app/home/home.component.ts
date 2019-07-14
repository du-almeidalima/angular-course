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

  public onLoadServers() {
    // Complex calculation
    setTimeout(() => {
      this.router.navigate(['/servers'])
        .then( () => {
          console.log(this.router.url);
      });

    }, 1500);
  }
}

/**
 * Here, to navigate to somewhere else from a TS file one could make use of the Router. By injecting it to the constructor
 * the Router method navigate can travel to another component listed in the routers array
 */
