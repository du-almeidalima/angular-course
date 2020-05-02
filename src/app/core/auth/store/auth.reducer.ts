import { User } from '../user.model';
import  * as AuthActions from './auth.actions';

export interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: null
}

const authReducer = (state: AuthState = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    case AuthActions.LOG_IN:
      return {
        ...state,
        user: action.payload
      };

    case AuthActions.LOG_OUT:
      return {
        user: null
      };

    default:
      return state;
  }
}

export { authReducer };
