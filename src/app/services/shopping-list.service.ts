import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({providedIn: "root"})
export class ShoppingListService {

  private _ingredients: Ingredient[] = [
    new Ingredient('Banana', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Broccoli', 2),
  ];

  public get ingredients() : Ingredient[] {
    return this._ingredients.slice();
  }

  public addIngredient(newIngredient: Ingredient): void {
    this.ingredients.push(newIngredient);
  }
}

/**
 * Basically the same approach as in RecipeService, but here we're also handling the addition of ingredients.
 * Instead of emitting an event on ShoppingListComponent we created a function here
 */
