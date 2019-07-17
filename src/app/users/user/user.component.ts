import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.paramsSubscription = this.route.params.subscribe(
      // This will receive the updated set of params for this route, whenever it changes
      (params: Params) => {
        this.user = {
          id: params['id'],
          name: params['name']
        };
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  // BTW, it also works with the DoCheck method
  // ngDoCheck(): void {
  //   this.user = {
  //     id: this.route.snapshot.params['id'],
  //     name: this.route.snapshot.params['name']
  //   };
  // }
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

/**
 * Using this.route.params (Observable) to subscribe to subsequent changes of the URL once the component is initialized.
 * rout.params receive 3 functions as parameters, the first will be fired whenever data is send through the observable.
 *
 * By using a function like above, we're getting the updated set of parameters of this route, whenever it changes
 */

/**
 * A note about subscribing to route.params, if we subscribe this component to this event, and then this component gets destroyed, this
 * subscription continues living! but Angular handles this for us! But it's also good to guarantee it by ourselves. We can do that
 * by assigning this subscription to a variable of type Subscription and whenever this component is destroyed, we unsubscribe it from this
 * event. For Routes it's not necessary doing this, but for our own component we need to manually unsubscribe.
 */
