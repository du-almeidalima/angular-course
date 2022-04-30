import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {ActionReducer, StoreModule} from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';
import {NgModule} from '@angular/core';
import {storeLogger} from "ngrx-store-logger";

import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {AppRoutesModule} from "./app-routes.module";
import {environment as env} from "../environments/environment";

import * as fromApp from './store/app.reducer';
import {AuthEffects} from "./core/auth/store/auth.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {RecipesEffects} from "./modules/recipes/store/recipes.effects";

function logger(reducer: ActionReducer<fromApp.AppState>): any {
  return storeLogger({
    timestamp: false,
    duration: false
  })(reducer);
}

const metaReducers = env.production ? [] : [logger];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(fromApp.reducers, { metaReducers }),
    EffectsModule.forRoot([ AuthEffects,  RecipesEffects ]),
    StoreDevtoolsModule.instrument(
      {logOnly: env.production}
    )
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/*
 * To set up a NgRx Store in our app we need to import the StoreModule.
 * After doing so, we need to say the Reducers (the functions) we will use with the forRoot method, that needs the keys
 * of the Reducers we'll use (which will be used in our app).
 *
 * After importing StoreMode and the Reducers, NgRx will set a Application Store for us, registering our reducers.
 * Now any actions can reach our reducers.
 */


/*
 * About RxJs Map and High Order Mapping operators
 *
 * - Concat: Similar to array concat. It will take two or more observables, subscribe to the first one,
 * map its emitted values and wait for it to complete before subscribing to the next one.
 * - ConcatMap: will take multiple observables and map each of them into another observable and wait for
 * each to complete before subscribing to the next one.
 *
 *
 * - Merge: As its name implies, it will merge two or more observables and subscribe to all of them,
 * and then it outputs the values of each source Observable to the combined result Observable as the multiple values
 * arrive over time. If one of the observables completes, the merge operator will still emit values of the remaining.
 * The result will not complete until ALL the merged Observables are completed.
 * - MergeMap: Very similar to ConcatMap, the MergeMap can subscribe to many observables and map them into others. For
 * example, take the $formValues and mapping into $httpRequest. But it will not do it sequentially, waiting for the
 * previous to finish. It will subscribe to all of them at the same time, and map the values into new observables as
 * those values are emitted. In another words, in parallel.
 *
 *
 * - Switch: Similar to Concat, but instead of waiting for the previous Observable to complete in order to subscribe to the
 * next one. It unsubscribes to the previous at the moment a new one arrives.
 * - SwitchMap: Applying the ideia of Switch, let's say the $formValues emits one value and the switchMap takes this value
 * and maps it into another observable (e.g. $httpRequest) and subscribes to it. However, before this observable finishes,
 * the $formValues emits another value. Then the switchMap will unsubscribe to the first and subscribe to the new one,
 * returning a new Observable.
 *
 *
 * - Exhaust: Can be thought of as a blend of Switch and Concat. The exhaust can take multiple Observables, but it will one
 * handle one at the time, similar to Concat. HOWEVER, if a new observable comes while the previous hasn't completed, it will
 * not queue it, like Concat. But it will just ignore it. Then once the first has completed, if a new arrives, it will be
 * subscribed.
 * ExhaustMap: Using an example, the $formValues emits one value, then this Observable is mapped by ExhaustMap into another
 * Observable, like $httpRequest. But, while the $httpRequest hasn't completed, another value is emitted by $formValues.
 * Instead of unsubscribing to it like the SwitchMap, the ExhaustMap will ignore incoming subscriptions while there's one
 * already subscribed and not completed.
 */
