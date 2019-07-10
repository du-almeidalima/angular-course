import {EventEmitter, Injectable} from "@angular/core";
import {RecipeModel} from "../recipes/recipe.model";

@Injectable({providedIn: "root"})
export class RecipeService {

  private recipes: RecipeModel[] = [
    new RecipeModel('Recipe 1', 'This is just a recipe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg'),
    new RecipeModel('Recipe 2', 'This is just another recipe test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];

  public recipeSelected = new EventEmitter<RecipeModel>();

  public getRecipes(): RecipeModel[] {
    return this.recipes.slice(); // Returning a new copy of recipes array
  }
}

/**
 * Here we set recipes as a private property and created a getter for it, as the getter if we just returned the:
 * " return this.recipes" it would return a direct reference to the object.
 * So we use the slice with no parameter to return a new array
 *
 * Note: The "providedIn" property must receive a module
 */
