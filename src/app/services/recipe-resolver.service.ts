import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {RecipeService} from "./recipe.service";
import {RecipeModel} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<RecipeModel>{

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<RecipeModel> | Promise<RecipeModel> | RecipeModel {

    return this.recipeService.getRecipeById( Number(route.params.id) );
  }
}
