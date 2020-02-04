import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  // Properties
  public recipes: RecipeModel[];

  constructor(private recipeService: RecipeService) {}

  // Getting the reference from RecipeServices
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    // Subscribing to recipes changes
    this.recipeService.recipesObservable.subscribe(
      (recipeList: RecipeModel[]) => {
        this.recipes = recipeList;
      }
    );
  }
}
