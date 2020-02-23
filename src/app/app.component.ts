import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {map} from 'rxjs/operators';

interface Post {
  id?: string ;
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly FIREBASE_URL = 'https://xenos-ng-firebase-project.firebaseio.com/';

  public sampleForm: FormGroup;
  public posts: Post[];

  constructor( private httpClient: HttpClient ) {}

  ngOnInit(): void {
    this.sampleForm = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null)
    });

    this.fetchPosts();
  }

  public onSubmitHandle(): void {

    this.httpClient
      .post<{name: string}>(this.FIREBASE_URL + '/posts.json', this.sampleForm.value)
      .subscribe((resp) => {
        console.log(resp.name);
      });
  }

  public onFecthPosts(): void {
    this.fetchPosts();
  }

  // UTILS
  private fetchPosts(): void {

    this.httpClient
      .get<Post[]>(`${this.FIREBASE_URL}/posts.json`)
      .pipe(
        map((respData) => {
         const postArray: Post[] = [];

         for (const key of Object.keys(respData)) {
           postArray.push({id: key, ...respData[key]});
         }

         return postArray;
        })
      )
      .subscribe(
        (data) => {
          this.posts = data;

          console.log(this.posts);
        }
      );
  }
}

/**
 * To use the HttpClient we need to inject it.
 *
 * When doing HTTP Actions that require a "body", we would need to parse it to JSON, but HttpClient does that for us.
 *
 * Angular uses Observables in their HttpClient, and for it to send a request we need to subscribe to then.
 */

/**
 * To model/map our Data we could use Pipes, as seen, pipes transforms the data, and the Observables allow us to do this
 */

/*
 * We can define the type of our Requests by passing a Generic to it
 */
