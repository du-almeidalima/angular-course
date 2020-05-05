import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import * as RecipesActions from './recipes.actions';
import {Recipe} from "../../../shared/models/recipe.model";
import {environment as env} from "../../../../environments/environment";

@Injectable()
export class RecipesEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(env.firebaseAPI + '.json')
        .pipe(
          // For recipes with no Ingredients
          map((recipes: Recipe[]) => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              }
            })
          }),
          map(recipes => {
            return new RecipesActions.SetRecipes(recipes)
          })
        )
    })
  )
}
