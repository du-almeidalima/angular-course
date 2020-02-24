import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Post from './post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly FIREBASE_URL = 'https://xenos-ng-firebase-project.firebaseio.com';

  constructor(private http: HttpClient) { }

  savePosts(post: Post): Observable<{name: string}> {
    return this.http
      .post<{name: string}>(this.FIREBASE_URL + '/posts.json', post);
  }

  getPosts(): Observable<Post[]> {
    // Simulating Delay
    return this.http
      .get<Post[]>(`${this.FIREBASE_URL}/posts.json`)
      .pipe(
        map((respData) => {
          const postArray: Post[] = [];

          if (respData !== null) {
            for (const key of Object.keys(respData)) {
              postArray.push({id: key, ...respData[key]});
            }
          }

          return postArray;
        })
      );
  }

  deletePostById(id: string): Observable<any> {
    return this.http
      .delete(`${this.FIREBASE_URL}/posts/${id}.json`);
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
