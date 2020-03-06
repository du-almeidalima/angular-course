import {Injectable} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {Observable, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  // PROPERTIES
  private _ingredients: Ingredient[] = [];
  private _ingredientsSubject = new Subject<Ingredient[]>();
  private _selectedIngredientSubject = new Subject<number>();

  // GETTERS AND SETTERS
  public get ingredientsChanged(): Observable<Ingredient[]> {
    return this._ingredientsSubject.asObservable();
  }

  public get selectedIngredient(): Observable<number> {
    return this._selectedIngredientSubject.asObservable();
  }

  public getIngredientByIndex(i: number): Ingredient {
    return this._ingredients[i]
  }

  public get ingredients() {
    return [...this._ingredients];
  }
  // METHODS
  // Add
  public addIngredient(ingredient: Ingredient): void {
    const index = this.findIngredientIndexByName(ingredient);

    if (index >= 0 ) {
      this._ingredients[index].amount += ingredient.amount;

    } else {
      this._ingredients.push(ingredient);
    }

    this._ingredientsSubject.next(this._ingredients);
  }

  public addIngredients(newIngredients: Ingredient[]): void {

    newIngredients.forEach( (ingredient: Ingredient) => {
      const index = this.findIngredientIndexByName(ingredient);

      if (index >= 0 ) {
        this._ingredients[index].amount = this._ingredients[index].amount + ingredient.amount;
      } else {
        this._ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
      }
    });
  }

  // Update
  public updateIngredient(ingredient: Ingredient, index: number): void {
    if (this.checkIngredientIndex(index)){
      this._ingredients[index] = ingredient;
      this._ingredientsSubject.next(this._ingredients);
    }
  }

  // Delete
  public deleteIngredient(index: number): Ingredient {
    if (this.checkIngredientIndex(index)){
      const removedIng = this._ingredients.splice(index, 1)[0];
      this._ingredientsSubject.next(this._ingredients);

      return removedIng;
    }
  }

  public selectIngredientToEdit(index: number): void {
    this._selectedIngredientSubject.next(index);
  }

  // Utils
  private findIngredientIndexByName(ingredient: Ingredient): number{
    const ingredientsNames = this._ingredients.map(ingredient => ingredient.name);

    return ingredientsNames.indexOf(ingredient.name);
  }

  private checkIngredientIndex(index: number): boolean{
    if ((index >= 0) && (index <= this._ingredients.length)) {
      return true
    } else {
      throw RangeError("Invalid Ingredient index.")
    }
  }
}

/**
 * Section 14: The EventEmitter "ingredientArrayUpdate" was changed to a Observable because EventEmitter shouldn't
 * be used for Cross Component communication.
 */
