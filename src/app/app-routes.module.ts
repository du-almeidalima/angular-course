import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";

// Defining our routes
const ROUTES: Routes = [
  // Home Route
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // This is used to only redirect if it's the full path
  // { path: 'recipes', loadChildren: './modules/recipes/recipes.module#RecipesModule'} // <- This is the OLD Syntax
  { path: 'recipes', loadChildren: () => import('./modules/recipes/recipes.module').then(m => m.RecipesModule) }
];

@NgModule({
  // Importing the RouterModule and configuring it with our routes
  imports: [ RouterModule.forRoot(ROUTES) ],
  // Exporting it to the main module
  exports: [ RouterModule ]
})
export class AppRoutesModule {}

/*
 * ------------ Comments -------------
 *
 * Getting the Recipe through the route params
 *
 * In order for me to get the Recipe being passed in the params, I decided to go with the resolver approach. Which
 * basically consist on a service that will return an Observable, Promise or our Recipe
 */

/*
 * Implementing Lazy Loading
 * To do so, after splitting the app into Feature Modules, we need to use the "loadChildren" property,
 * This will tell Angular to only load such module on demand.
 * Now angular will split the module into separated bundles and download them whenever it's needed!
 *
 * IMPORTANT: We need to remove the RecipesModule from the imports in the app.module.ts
 * https://angular.io/api/router/LoadChildren
 * https://angular.io/api/router/LoadChildrenCallback
 */
