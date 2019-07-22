import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public displayedRecipe: RecipeModel;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: RecipeModel) => {
        this.displayedRecipe = recipe;
      }
    );
  }
}

/**
 * Here we're listening to the event recipeSelected from RecipeService, it's important to subscribe to this in the
 * OnInit method. Remembering that we need to this only once
 */
