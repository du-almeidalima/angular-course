import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({providedIn: "root"})
export class ShoppingListService {

  private _ingredients: Ingredient[] = [
    new Ingredient('Banana', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Broccoli', 2),
  ];

  public ingredientArrayUpdate = new EventEmitter<Ingredient[]>();

  public get ingredients() : Ingredient[] {
    return this._ingredients.slice();
  }

  public addIngredient(newIngredient: Ingredient): void {
    this._ingredients.push(newIngredient);
    this.ingredientArrayUpdate.emit(this.ingredients);
  }
}

/**
 * Basically the same approach as in RecipeService, but here we're also handling the addition of ingredients.
 * Instead of emitting an event on ShoppingListComponent we created a function here
 */

/**
 * As for addIngredient, this wasn't working because we were passing a copy of the array a making the changes on the
 * original, so the copy wasn't sync. So to do this we used this approach, emitting an event whenever the ingredient
 * array changes.
 */
