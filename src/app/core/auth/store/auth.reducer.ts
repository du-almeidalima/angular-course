import {Action} from "@ngrx/store";
import {User} from "../user.model";

export interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: null
}

const authReducer = (state: AuthState = initialState, action: Action) => {

}

export { authReducer };
