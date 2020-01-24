import {Injectable} from '@angular/core';
import {Ingredient} from '../models/ingredient.model';
import {Observable, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  private _ingredients: Ingredient[] = [];
  private _ingredientObserver = new Subject<Ingredient[]>();

  public get ingredients() : Ingredient[] {
    return this._ingredients.slice();
  }

  public get ingredientObserver(): Observable<Ingredient[]> {
    return this._ingredientObserver.asObservable();
  }
  public addIngredient(newIngredient: Ingredient): void {
    const index = this.findIngredientIndexByName(newIngredient);

    if (index >= 0 ) {
      console.log(newIngredient);
      console.log(index);

      this._ingredients[index].amount += Number (newIngredient.amount);
    } else {
      this._ingredients.push(newIngredient);
    }

    this._ingredientObserver.next(this._ingredients);
  }

  public addIngredients(newIngredients: Ingredient[]): void {

    newIngredients.forEach( (newIngredient: Ingredient) => {
      const index = this.findIngredientIndexByName(newIngredient);

      if (index >= 0 ) {
        this._ingredients[index].amount = this._ingredients[index].amount + newIngredient.amount;
      } else {
        this._ingredients.push(Object.create(newIngredient));
      }
    });
  }

  private findIngredientIndexByName(ingredient: Ingredient): number{
    const ingredientsNames = this._ingredients.map(ingredient => ingredient.name);

    return ingredientsNames.indexOf(ingredient.name);
  }
}

/**
 * Section 14: The EventEmitter "ingredientArrayUpdate" was changed to a Observable because EventEmitter shouldn't
 * be used for Cross Component communication.
 */
