import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./modules/shopping-list/shopping-list.component";
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./core/auth/auth.component";

// Defining our routes
const ROUTES: Routes = [
  // Home Route
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // This is used to only redirect if it's the full path
  // Recipes Routes
  // Shopping List Routes
  { path: 'shopping-list', component: ShoppingListComponent},

  // Auth routes
  { path: 'login', component: AuthComponent}
];

@NgModule({
  // Importing the RouterModule and configuring it with our routes
  imports: [ RouterModule.forRoot(ROUTES) ],
  // Exporting it to the main module
  exports: [ RouterModule ]
})
export class AppRoutesModule {}

/**
 * ------------ Comments -------------
 *
 * Getting the Recipe through the route params
 *
 * In order for me to get the Recipe being passed in the params, I decided to go with the resolver approach. Which
 * basically consist on a service that will return an Observable, Promise or our Recipe
 */
