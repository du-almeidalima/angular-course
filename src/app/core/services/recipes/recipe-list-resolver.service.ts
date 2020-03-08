import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RecipeModel} from "../../../recipes/recipe.model";
import {Observable} from "rxjs";
import DataStorageService from "../../http/data-storage.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class RecipeListResolver implements Resolve<RecipeModel[]>{

  private haveFetchedRecipes = false;

  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {

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
 * Note that it will return a Observable<RecipeModel[]> but Angular will subscribe to it in its Routing process
 */
