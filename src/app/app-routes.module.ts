import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {HomeComponent} from "./home/home.component";

// Defining our routes
const ROUTES: Routes = [
  // Home Route
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // This is used to only redirect if it's the full path
  // Recipes Routes
  { path: 'recipes', component: RecipesComponent},

  // Shopping List Routes
  { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  // Importing the RouterModule and configuring it with our routes
  imports: [ RouterModule.forRoot(ROUTES) ],
  // Exporting it to the main module
  exports: [ RouterModule ]
})
export class AppRoutesModule {}
