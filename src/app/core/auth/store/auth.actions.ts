import {Action} from "@ngrx/store";
import {User} from "../user.model";

export const LOGIN_START = '[Auth] Login Started';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string, password: string }) {}
}

export class LogInSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class LogInFail implements Action{
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export type AuthActions = LoginStart | LogInSuccess | LogInFail | LogOut;
