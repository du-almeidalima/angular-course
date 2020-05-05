import {Recipe} from "../../../shared/models/recipe.model";
import * as RecipesActions from './recipes.actions';

export interface RecipesState {
  recipes: Recipe[],
  selectedRecipe: Recipe,
  isEditing: boolean
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  isEditing: false
}

const recipesReducer = (state: RecipesState = initialState, action: RecipesActions.RecipesActions) => {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    default:
      return state;
  }
}

export { recipesReducer };
