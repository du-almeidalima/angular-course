import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
  }

}

/**
 * In this component I'm getting the parameter passed through url
 *  - "localhost:4200/users/:id"
 * We can use ActivatedRoute to get it, just injecting it into the component. and remembering that this class holds metadata about the
 * route this component is on, and one of this metadata is the url parameters.
 * We could use the property "snapshot" and get the "params", which is an array of parameters defined in the Module of this route
 *
 * Note: Snapshot means = a piece of information or short description that gives an understanding of a situation at a particular time
 */
