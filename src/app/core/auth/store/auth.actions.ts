import {Action} from "@ngrx/store";
import {User} from "../user.model";

export const LOG_IN = '[Auth] Login';
export const LOG_OUT = '[Auth] Logout';

export class LogIn implements Action{
  readonly type = LOG_IN
  constructor(public payload: User) {}
}

export class LogOut implements Action{
  readonly type = LOG_OUT
}

export type AuthActions = LogIn | LogOut
