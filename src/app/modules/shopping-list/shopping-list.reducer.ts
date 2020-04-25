import { Ingredient } from "../../shared/models/ingredient.model";

/* The initial state of this feature */
const initState = {
  ingredients: [
    new Ingredient('Tomato', 4),
    new Ingredient('Onion', 10)
  ]
}


const shoppingListReducer = (state = initState, action) => {

};

export default { shoppingListReducer };

/*
 * The reducer is a function that will take the state and the action to perform the change on the application state.
 * In ngRx Redux Reducer. This function will be called the NgRx package and this will pass 2 arguments to this func:
 * - state: The current state before it was change, it can also receive a initial state as default value
 * - action: The action that will be performed
 */
