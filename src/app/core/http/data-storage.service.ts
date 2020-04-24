import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../modules/recipes/recipe.service";
import {Recipe} from "../../shared/models/recipe.model";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment as env} from "../../../environments/environment";

/*
 * This class is responsible for making http calls to Firebase API.
 */

@Injectable({providedIn: "root"})
export class DataStorageService {

  constructor( private http: HttpClient, private recipeService: RecipeService) {}

  /**
   * Save the Recipes from RecipeServe state int Firebase Database API using a PUT HTTP verb.
   * This will overwrite the previous stored Recipes.
   */
  public saveRecipes():any{
    const recipes = this.recipeService.getRecipes();

    this.http.put(env.firebaseAPI + '.json', recipes)
      .subscribe((recipeList: Recipe[]) => {
        console.log(recipeList)
      });
  }

  /**
   * Fetch Recipes from API and replace the them in RecipeService state.
   */
  public getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(env.firebaseAPI + '.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.saveRecipes(recipes);
        })
      )
  }
}

/*
 * For saving all recipes and overwrite the previous in Firebase we need to use the PUT Http verb
 */
/*
 * I'm using the "pipe(map()...)" on getRecipes method in order to prevent recipes with no ingredients to don't have
 * a "ingredients[]" property
 */

/*
 * Since the Firebase was changed to only accept requests authenticated, I've included the User token on the requests.
 * For that I'll use the authService.userAuthObservable: BehaviorSubject and pipe it into the "Take" operator.
 * in "take()" we can chose how many values we take from a Subject until unsubscribe from it. Since I just wanted to
 * get the UserToken...
 *
 * The problem is, we cannot return another Observable from a "subscribe()", for that I'll use "exhaustMap" operator,
 * which will wait for the first Observable to complete (userAuthObservable) which will happen after the "take" finishes
 * and replace this Observable with another one
 */
