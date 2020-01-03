import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../models/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  private _ingredients: Ingredient[] = [];

  public ingredientArrayUpdate = new EventEmitter<Ingredient[]>();

  public get ingredients() : Ingredient[] {
    return this._ingredients.slice();
  }

  public addIngredient(newIngredient: Ingredient): void {
    this._ingredients.push(newIngredient);
    this.ingredientArrayUpdate.emit(this.ingredients);
  }

  public addIngredientsArray(ingredientsArray: Ingredient[]): void {
    const ingredientsNames = this._ingredients.map(ingredient => ingredient.name);

    ingredientsArray.forEach( (ingredient: Ingredient) => {

      if (ingredientsNames.indexOf(ingredient.name) >= 0){

        this._ingredients[ingredientsNames.indexOf(ingredient.name)].amount += ingredient.amount;

      } else {

        this._ingredients.push(ingredient);
      }
    })
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

/**
 * For addIngredientsArray we're looping through both arrays checking if one has an item of the other and then just
 * adding the amount
 */
