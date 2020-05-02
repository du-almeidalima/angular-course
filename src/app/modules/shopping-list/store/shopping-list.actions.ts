import { Action } from "@ngrx/store";
import { Ingredient } from "../../../shared/models/ingredient.model";

// ACTIONS CONSTANTS
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const REMOVE_INGREDIENT = '[Shopping List] Remove Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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

  constructor(public payload: Ingredient) {}
}

export class RemoveIngredient implements Action{
  readonly type = REMOVE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT

  /**
   * @param payload Ingredient index, this will be used to Updated and Delete an Ingredient afterwards
   */
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT
}


// ACTIONS TYPES
export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | RemoveIngredient
  | StopEdit
  | StartEdit;
