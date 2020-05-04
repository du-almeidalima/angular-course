import {Action} from "@ngrx/store";
import {Recipe} from "../../../shared/models/recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes'
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) { }
}

export type RecipesActions = SetRecipes;
