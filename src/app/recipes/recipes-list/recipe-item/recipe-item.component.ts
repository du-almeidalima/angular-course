import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // Properties
  @Input()
  public recipe: RecipeModel;

  constructor(private recipeService: RecipeService) { }

  public onRecipeClick(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }

  ngOnInit() {
  }

}

/**
 * In the this onRecipeClick we're just triggering an event, and we're not passing any data because it's not its
 * parent (RecipeListComponent) that we want to listen, so we're just emitting an event that will be propagated through
 * its parent to RecipesComponent.
 * In fact, its parent, the RecipeListComponent, already have the data of the recipe, remember that it's looping through
 * the recipes array, so we can just send this data up
 */

/**
 * As for passing the recipe to be displayed, instead of passing it up through 2 levels ( which was what we were doing )
 * We could pass it in an event in recipeService
 */
