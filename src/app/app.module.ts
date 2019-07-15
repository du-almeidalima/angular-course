import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';


const appRoutes: Routes = [
  {  path: '', component: HomeComponent },          // localhost:4200
  {  path: 'users', component: UsersComponent },    // localhost:4200/users
  {  path: 'users/:id', component: UserComponent }, // Loading a single user by passing parameters
  {  path: 'servers', component: ServersComponent } // localhost:4200/servers
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * To pass parameters dynamically, use the ":" on the "path" of the rout, this tells Angular that this will be a dynamic part of the path
 */

/**
 * Since Routing is something that should be available app-wide, I'm going to place it into the AppModule.
 * It needs to be imported from '@angular/router'.
 *
 * It should hold an array of routes, each route is a Js object. It should follow a specific pattern so Angular can user
 * {
 *     path: 'user',
 *     component: UsersComponent
 * }
 *
 * this will access, for this case, localhost:4200/user. After, the "component" addition tells Angular what should be loaded when
 * this route is accessed, in this case it will load the component UsersComponent, which will be our "page".
 * It's important that this component is configured to serve as a page, so it has all the content of the page.
 *
 * After creating our routes array we need to add it to Angular imports. One can do so by adding "RouterModule" to "imports" array
 * and in this "RouterModule" we call forRoot() and register our routes array.
 *
 * Alright! now the only piece missing is how to only render the current selected component. We need to tell Angular WHERE to display it.
 * One can do so by adding "<router-outlet></router-outlet>" Directive (That looks like a component)
 * in where the components loaded by the route should be displayed. This will mark the place where the components should be displayed.
 * In this case in the app.component.html
 */
