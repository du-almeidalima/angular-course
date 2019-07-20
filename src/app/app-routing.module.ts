import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {  path: '', component: HomeComponent },
  // Users
  {  path: 'users', component: UsersComponent , children: [
      {  path: ':id/:name', component: UserComponent }
    ]},
  // Servers
  {  path: 'servers', component: ServersComponent, children: [
      {  path: ':id/edit', component: EditServerComponent },
      {  path: ':id', component: ServerComponent }
    ]
  },
  // PageNotFound
  {
    path: 'not-found', component: PageNotFoundComponent
  },
  {
    path: 'something', redirectTo: '/not-found', // Remember to use absolute paths
  },
  {
    path: '**', redirectTo: '/not-found'
  }
];

// We don't need to add declarations here because those components are already on AppModule, just those one
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],

  // The export is a way for us to add the "imports" of this module to another module, in our case, the only thing we want is the RouterModu
  exports: [ RouterModule ]
})
// Now, with everything in place, we will add this module to our main module
export class AppRoutingModule {

}
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

/**
 * Setting up Child (Nested) Routes
 *
 * So our routes used to look like this
 * const appRoutes: Routes = [
 * {  path: '', component: HomeComponent },                    // localhost:4200
 * {  path: 'users', component: UsersComponent },              // localhost:4200/users
 * {  path: 'users/:id/:name', component: UserComponent },     // Loading a single user by passing parameters
 * {  path: 'servers', component: ServersComponent },          // localhost:4200/servers
 * {  path: 'servers/:id/edit', component: EditServerComponent },
 * {  path: 'servers/:id', component: ServerComponent }
 * ];
 *
 * We can make it better approach to this, note that we have lots of duplicated routes. check above the solution
 */

/**
 * Let's say that the url doesn't exist. In this case, we could create a route for a component that represents our NotFound page.
 * And then, for the other paths we could just "redirectTo" this component.
 *
 * But how could we map all possible paths that are not mapped to a component!?
 * for that we can use the "**" wildcard
 *
 * IMPORTANT: This should be the last item of the array! Otherwise it would override the others
 */





/**
 * Important: Redirection Path Matching
 * In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding
 * redirections.
 * By default, Angular matches paths by prefix. That means, that the following route will match both /recipes  and just /
 * { path: '', redirectTo: '/somewhere-else' }
 * Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?
 * Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified
 * in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").
 * To fix this behavior, you need to change the matching strategy to "full" :
 * { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
 * Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).
 */
