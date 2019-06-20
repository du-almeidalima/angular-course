import { Component, OnInit } from '@angular/core';
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  public recipes: RecipeModel[] = [
    new RecipeModel('Recipe 1', 'This is just a recipe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg'),
    new RecipeModel('Recipe 2', 'This is just another recipe test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];

  constructor() {
    console.log(this.recipes[0].name);
  }

  ngOnInit() {
  }

}
