import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {AccountComponent} from './account/account.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {AccountsService} from './services/accounts.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  // providers: [AccountsService, LogService],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/** Remembering the Hierarchical Injector, here we find a providers array, if we place a Service here, a instance of that Service will be
 *  Available in our whole app!
 *
 * NOTE: On Angular 6+ The services that are injectable changed, now we can only define that a Service is injectable in the class, and don't
 * need to specify it on the @NgModule providers for global access. The new way offers lazy loading
 * check on: https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/5401644#questions/6625014
 */
