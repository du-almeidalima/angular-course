import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import Post from './post.model';
import {Observable, Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly FIREBASE_URL = 'https://xenos-ng-firebase-project.firebaseio.com';

  // Creating Subject for error notifying
  public error = new Subject<string>();

  constructor(private http: HttpClient) { }

  savePosts(post: Post, callback: any): void {
    // HttpClient methods return a Observable, so we could use the "error" parameter to notify the error
    this.http
      .post<{name: string}>(
        this.FIREBASE_URL + '/posts.json', post,
        {
          observe: 'response'
        })
      .subscribe(
        // Next
        response => {
          console.log(response);

          if (callback) {
            callback();
          }
        },
        // Error
        error => {
          this.error.next(error);
        });
  }

  getPosts(): Observable<Post[]> {
    // Multiple Query Params
    let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty');
    queryParams = queryParams.append('custom', 'param');

    // Simulating Delay
    return this.http
      .get<Post[]>(
        `${this.FIREBASE_URL}/posts.json`,
        {
          headers: new HttpHeaders({'Custom-Header': 'Hey'}),
          params: queryParams
        }
      )
      .pipe(
        map((respData) => {
          const postArray: Post[] = [];

          if (respData !== null) {
            for (const key of Object.keys(respData)) {
              postArray.push({id: key, ...respData[key]});
            }
          }

          return postArray;
        }),
        catchError(err => {
          // Analytic stuff or assign to a error Subject
          console.log('Inside catchError: ' + err);
          return throwError(err);
        })
      )
    ;
  }

  deletePostById(id: string): Observable<any> {
    return this.http
      .delete(
        `${this.FIREBASE_URL}/posts/${id}.json`,
        { observe: 'events'}
      )
      .pipe(
        tap( event => {
          // Filtering the events
          switch (event.type) {
            case HttpEventType.Response:
              console.log(`Type ${event.type}(response): ${event.body}`);
              break;

            case HttpEventType.Sent:
              console.log(`Type ${event.type}(sent)`);
              break;

            default:
              console.log('Other type');
              break;
          }
        })
      )
    ;
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

/*
 * Error handling with Subscribe
 * Imagine if we wanted more things interested in the error when it happens, for example, multiple components or other services.
 * We could use for that, a Subscribe to notify those interested in the error.
 */

/* Error handling with catchError Operator
 * If we wanted to do some analytics with this error we could use the "catchError" operator, and at the end, since the caller function
 * is expecting a Observable we can call the method "throwError"
 */

/*
 * == OPTIONS ==
 * -- Headers
 *
 * To set a header for a HTTP method, all we need to do is pass a second/third (depends on method) parameter to the HttpClient method
 * in this object we can set lots of things, one is the header.
 *    {
 *         headers: new HttpHeaders({'Custom-Header': 'Hey'})
 *    }
 *
 * -- Query Params
 *
 * Similar to Headers, we can add a Query Params in the "options" object
 *
 * -- Observing Different Types of Responses
 *
 * By default, HttpClient will parse the response to body and only give the result to us, if we need more than that, such as status code,
 * response headers... We can pass the "observe" property into the "options" object and set what we want to receive.
 *    {
 *      ...
 *      observe: 'response | body | events'
 *    }
 */

/*
 * TIP
 *
 * If we want to do something with a response from HttpClient but not alter it, we can use the "Tap" Pipe, as in delete method
 */
