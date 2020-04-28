import { Action } from "@ngrx/store";
import { Ingredient } from "../../../shared/models/ingredient.model";

// ACTIONS CONSTANTS
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

// ACTIONS CREATORS
export class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action{
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: {index: number, updatedIngredient: Ingredient}) {}
}

export class RemoveIngredient implements Action{
  readonly type = REMOVE_INGREDIENT;

  /**
   * @param payload Ingredient index
   */
  constructor(public payload: number) {}
}

// ACTIONS TYPES
export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | RemoveIngredient;
