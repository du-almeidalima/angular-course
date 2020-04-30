import {User} from '../user.model';
import  * as AuthActions from './auth.actions';

export interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: null
}

const authReducer = (state: AuthState = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    case "LOG_IN":
      const { email, userId, _token, _expirationDate } = { ...action.payload }
      const user = new User(email, userId, _token, _expirationDate);

      return {
        ...state,
        user
      };

    case "LOG_OUT":
      return {
        user: null
      };

    default:
      return state;
  }
}

export { authReducer };
