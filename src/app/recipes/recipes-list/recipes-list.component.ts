import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  // Events
  @Output()
  public onRecipeClickedForwarded = new EventEmitter<RecipeModel>();

  constructor(private recipeService: RecipeService) {}

  // Getting the reference from RecipeServices
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  public onRecipeForwardedHandler(recipe: RecipeModel): void{

    this.onRecipeClickedForwarded.emit(recipe);
  }

}
