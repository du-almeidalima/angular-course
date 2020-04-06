import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {HomeComponent} from "./home/home.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {NoRecipeComponent} from "./recipes/no-recipe/no-recipe.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeListResolver} from "./core/services/recipes/recipe-list-resolver.service";
import {AuthComponent} from "./core/auth/auth.component";
import {AuthGuard} from "./core/auth/auth.guard";

// Defining our routes
const ROUTES: Routes = [
  // Home Route
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // This is used to only redirect if it's the full path
  // Recipes Routes
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: NoRecipeComponent },
      // We'll use the same component to create and edit a Recipe
      { path: 'create', component: RecipeEditComponent },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeListResolver] },
      // It's important to leave the routes with dynamic values to last, otherwise Angular will try to parse other
      // paths into this value e.g. "create" would become the id
      // { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeListResolver]}
    ]
  },

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
