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
    StoreModule.forRoot(fromApp.reducers, {metaReducers}),
    EffectsModule.forRoot([ AuthEffects ]),
    CoreModule,
    SharedModule,
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
