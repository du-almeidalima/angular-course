import { Component, OnInit } from '@angular/core';
import {RecipeModel} from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public displayedRecipe: RecipeModel;

  constructor() { }

  public setDisplayedRecipe(recipe: RecipeModel){
    this.displayedRecipe = recipe;
  }

  ngOnInit() {
  }

}
