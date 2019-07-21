import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  private errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // path: 'not-found', component: ErrorPageComponent, data: {message: '404 Page not Found!'}
    // Retrieving the data from the initialization of the route
    this.errorMessage = this.route.snapshot.data['message'];

    // Retrieving the data from the changes in the current instantiation
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );

  }

}
