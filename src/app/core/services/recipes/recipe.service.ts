import {Injectable} from '@angular/core';
import {RecipeModel} from '../../../shared/models/recipe.model';
import {Observable, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService {
  private readonly _recipesSubject = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [];

  public haveFetched = false;

  public get recipesObservable(): Observable<RecipeModel[]> {
    return this._recipesSubject.asObservable();
  }

  public getRecipes(): RecipeModel[] {
    return this.recipes.slice(); // Returning a new copy of recipes array
  }

  public getRecipeById(id: number): RecipeModel | undefined {
    return this.recipes.find(
      (recipe: RecipeModel) => {
          return recipe.id === id;
      }
    );
  }

  public saveRecipe(recipe: RecipeModel): RecipeModel {
    if (recipe != null) {
      // Update
      if (recipe.id !== null && !isNaN(recipe.id)) {
        const index = this.recipes.indexOf( this.recipes.find(r => r.id === recipe.id) );

        this.recipes[index] = recipe;
      }
      // Add
      else {
        // Workaround for Id generators
        const maxId = Math.max.apply(null, this.recipes.map(r => r.id));
        recipe.id = maxId + 1;
        this.recipes.push(recipe);
      }

      this._recipesSubject.next(this.recipes.slice());
      return recipe;
    }
  }

  public saveRecipes(recipeList: RecipeModel[]) {
    this.recipes = recipeList;
    this._recipesSubject.next(this.recipes.slice());
  }

  public removeRecipeById(id: number): RecipeModel {
    const index = this.recipes.findIndex(r => r.id === id);

    if (index > -1) {
      const deletedRecipe = this.recipes.splice(index, 1)[0];
      this._recipesSubject.next(this.recipes.slice());

      return deletedRecipe;
    } else {
      throw new Error("Could not find a recipe with id: " + id);
    }
  }
}

/**
 * Here we set recipes as a private property and created a getter for it, as the getter if we just returned the:
 * " return this.recipes" it would return a direct reference to the object.
 * So we use the slice with no parameter to return a new array
 *
 * Note: The "providedIn" property must receive a module
 */

/*
 * The service had to be updated with a Subscriber so the RecipeList component would be notified whenever a recipe was
 * updated / created.
 */
