import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

// This interface just ensures that the component has the "canDeactivate" method that the class "CanDeactivateGuardService" will call
export interface CanComponentDeactivate {

    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 *  export declare interface CanDeactivate<T> {
 *     canDeactivate(component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
 *}
 *
 * This interface we built was just the "Type" of component that the interface "CanDeactivate" will receive as an argument "component: T"
 * We could've just passed the "ServerComponent" but instead we passed an interface that every component can implements and use this guard!
 */
@Injectable({providedIn: 'root'})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

  // This component is being injected by Angular automatically based on the route this guard is on
  canDeactivate(component: CanComponentDeactivate,
                currentRout: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return component.canDeactivate();
  }
}

/**
 * Basically, what we've done here is. The "CanDeactivate" interface receives 4 arguments:
 * - component<T>
 * - currentRoute: ActivatedRouteSnapshot
 * - currentState: RouterStateSnapshot
 * - nextState?: RouterStateSnapshot
 *
 * So we need to provide an generic to be the type of the component, instead of providing just one type, we created an interface that can
 * be implemented by other components and used this interface as the type of the component!
 *
 * The interface "CanDeactivate" require to implement the method "canDeactivate" and this method should return:
 * - Observable<boolean> | Promise<boolean> | boolean
 *
 * So since we know that our component will have a method called "canDeactivate" that will return those values we can call it!
 * So when Angular Router automatically injects the component of the route this Guard is on, they will always have this method.
 */
