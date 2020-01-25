import {Injectable} from '@angular/core';
import {Ingredient} from '../models/ingredient.model';
import {Observable, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  // Properties
  private _ingredients: Ingredient[] = [];
  private _ingredientsSubject = new Subject<Ingredient[]>();

  private _selectedIngredientSubject = new Subject<number>();

  // Getters and Setters
  public get ingredientsChanged(): Observable<Ingredient[]> {
    return this._ingredientsSubject.asObservable();
  }

  public get selectedIngredient(): Observable<number> {
    return this._selectedIngredientSubject.asObservable();
  }

  // Methods
  public addIngredient(newIngredient: Ingredient): void {
    const index = this.findIngredientIndexByName(newIngredient);

    if (index >= 0 ) {
      this._ingredients[index].amount += newIngredient.amount;

    } else {
      this._ingredients.push(newIngredient);
    }

    this._ingredientsSubject.next(this._ingredients);
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

  public selectIngredientToEdit(index: number): void {
    this._selectedIngredientSubject.next(index);
  }

  // Utils
  private findIngredientIndexByName(ingredient: Ingredient): number{
    const ingredientsNames = this._ingredients.map(ingredient => ingredient.name);

    return ingredientsNames.indexOf(ingredient.name);
  }
}

/**
 * Section 14: The EventEmitter "ingredientArrayUpdate" was changed to a Observable because EventEmitter shouldn't
 * be used for Cross Component communication.
 */
