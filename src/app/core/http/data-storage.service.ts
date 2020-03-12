import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../services/recipes/recipe.service";
import {RecipeModel} from "../../shared/models/recipe.model";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

/*
 * This class is responsible for making http calls to Firebase API.
 */

@Injectable({providedIn: "root"})
export default class DataStorageService {
  private readonly MY_LISTS_URL = 'https://my-lists-api.firebaseio.com/';

  constructor( private http: HttpClient, private recipeService: RecipeService) {}

  /**
   * Save the Recipes from RecipeServe state int Firebase Database API using a PUT HTTP verb.
   * This will overwrite the previous stored Recipes.
   */
  public saveRecipes():any{
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.MY_LISTS_URL+'.json', recipes)
      .subscribe((recipeList: RecipeModel[]) => {
        console.log(recipeList)
      });
  }

  /**
   * Fetch Recipes from API and replace the them in RecipeService state.
   */
  public getRecipes(): Observable<RecipeModel[]> {
    return this.http
      .get<RecipeModel[]>(this.MY_LISTS_URL+'.json')

      .pipe(
        map((recipes: RecipeModel[]) => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap((recipes: RecipeModel[]) => {
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
