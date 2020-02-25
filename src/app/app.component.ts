import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import Post from './post.model';
import {PostsService} from './posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public sampleForm: FormGroup;
  public posts: Post[] = [];
  public isLoading = false;

  public error = null;
  public errorSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    // Subscribing for Error notifications
    this.errorSubscription = this.postsService.error.subscribe(err => {
      console.log(err);
      this.error = err;
    });

    // Creating the form
    this.sampleForm = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null)
    });

    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  public onSubmitPostHandle(): void {
    const post: Post = {...this.sampleForm.value};
    // Using bind here to execute this on postsService
    this.postsService.savePosts(post, this.fetchPosts.bind(this));

    this.sampleForm.reset();
  }

  public onDeletePostHandle(id: string) {
    this.postsService.deletePostById(id)
      .subscribe((post: Post) => {
        console.log(post);
        this.fetchPosts();
      });
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
      .subscribe(
        // "next"
        (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      },
        // "error"
        error => {
          console.log(error);
          this.error = error;
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

/*
 * Error handling
 * For catching errors in our HttpClient calls we could use the "error" parameter of Observables
 * Remember that observables have three properties:
 *  "next, error, complete"
 * So if one error occur, we can get it by assigning a second function as a parameter. Though this is ok, it's not the only alternative
 */
