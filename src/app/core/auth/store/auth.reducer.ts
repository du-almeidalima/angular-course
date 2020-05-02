import { User } from '../user.model';
import  * as AuthActions from './auth.actions';

export interface AuthState {
  user: User,
  authError: string,
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false
}

const authReducer = (state: AuthState = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        user: null,
        authError: null,
        isLoading: true
      }

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null,
        isLoading: false
      };

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };

    default:
      return state;
  }
}

export { authReducer };
