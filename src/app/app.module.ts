import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import {UserManagerService} from './services/user-manager.service';
import { UserChangesCounterComponent } from './user-changes-counter/user-changes-counter.component';
import {HideMeDirective} from './shared/hide-me.directive';
import {UserColorDirective} from './shared/user-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    UserChangesCounterComponent,
    HideMeDirective,
    UserColorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [UserManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
