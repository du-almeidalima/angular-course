import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import Post from './post.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public sampleForm: FormGroup;
  public posts: Post[] = [];
  public isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.sampleForm = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null)
    });

    this.fetchPosts();
  }

  public onSubmitHandle(): void {
    const post: Post = {...this.sampleForm.value};
    this.postsService
      .savePosts(post)
      .subscribe((id => {
        console.log(id);
        this.fetchPosts();
      }));

    this.sampleForm.reset();
  }

  public onFetchPosts(): void {
    this.fetchPosts();
  }

  public onClearPosts(): void {
    this.posts = [];
  }

  // UTILS
  private fetchPosts(): void {

    this.isLoading = true;
    this.postsService.getPosts()
      .subscribe( (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
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

/**
 * To model/map our Data we could use Pipes, as seen, pipes transforms the data, and the Observables allow us to do this
 */

/*
 * We can define the type of our Requests by passing a Generic to it
 */

/*
 * Now that we've seen how to use HttpClient, we should go for a better architecture, we moved the data and request logic to the service
 */
