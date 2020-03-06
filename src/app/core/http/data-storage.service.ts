import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../services/recipe.service";
import {RecipeModel} from "../../recipes/recipe.model";

/*
 * This class is responsible for making http calls to Firebase api
 */

@Injectable({providedIn: "root"})
export default class DataStorageService {
  private readonly MY_LISTS_URL = 'https://my-lists-api.firebaseio.com/';

  constructor( private http: HttpClient, private recipeService: RecipeService) {}

  public saveRecipes():any{
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.MY_LISTS_URL+'.json', recipes)
      .subscribe((recipeList: RecipeModel[]) => {
        console.log(recipeList)
      });
  }
}

/*
 * For saving all recipes and overwrite the previous in Firebase we need to use the PUT Http verb
 */
