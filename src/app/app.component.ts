import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Post {
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public posts: Observable<Post[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.posts = this.http.get('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        map((postsResponse: any[]) => {
          return postsResponse.map( p => {
            return {title: p.title, body: p.body};
          });
        })
      );
  }
}
