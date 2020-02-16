import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  private readonly FIREBASE_URL = 'https://xenos-ng-firebase-project.firebaseio.com/';

  public sampleForm: FormGroup;

  constructor( private httpClient: HttpClient ) {}

  ngOnInit(): void {
    this.sampleForm = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null)
    });
  }

  public onSubmitHandle(): void {

    this.httpClient.post(this.FIREBASE_URL + '/posts.json', this.sampleForm.value)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}

/**
 * To use the HttpClient we need to inject it.
 *
 * When doing HTTP Actions that require a "body", we would need to parse it to JSON, but HttpClient does that for us.
 *
 * Angular uses Observables in their HttpClient, and for it to send a request we need to subscribe to then.
 */
