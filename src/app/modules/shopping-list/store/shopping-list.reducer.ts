import { Action } from "@ngrx/store";

import { Ingredient } from "../../../shared/models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

/* The initial state of this feature */
const initState = {
  ingredients: [
    new Ingredient('Tomato', 4),
    new Ingredient('Onion', 10)
  ]
}

/**
 * The reducer will map the action.type and return a new copy of the state with the action specific alterations.
 * @param state Current State
 * @param {Action} action The action type and the payload
 */
const shoppingListReducer = (state = initState, action: ShoppingListActions.ShoppingListActions) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [ ...state.ingredients, action.payload ]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    /**
     * For the initial state, we need to use the "default" clause, because NgRx will emit this action at first set up
     */
    default:
      return state;
  }
};

export { shoppingListReducer };

/*
 * The reducer is a function that will take the state and the action to perform the change on the application state.
 * In ngRx Redux Reducer. This function will be called the NgRx package and this will pass 2 arguments to this func:
 * - state: The current state before it was change, it can also receive a initial state as default value
 * - action: The action that will be performed
 */

/*
 * Since we're mapping the Actions.type with strings and this is pretty easier to get wrong, the actions file was
 * created to standardize it.
 *
 * The Action interface just have the "type" property, to add another property, like payload, we can create a class that
 * implements this interface and have another property. After doing this we can use our new "Action" type in the reducer
 */
