import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../../../shared/models/recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../../http/data-storage.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class RecipeListResolver implements Resolve<Recipe[]>{

  private haveFetchedRecipes = false;

  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {

    if (this.haveFetchedRecipes) {
      return null;
    } else {
      this.haveFetchedRecipes = true;
      return this.dataStorageService.getRecipes();
    }
  }

}

/*
 * This Resolver will call the getRecipes whenever the user tries to access the "[host]/recipes/"
 * Note that it will return a Observable<Recipe[]> but Angular will subscribe to it in its Routing process
 */
