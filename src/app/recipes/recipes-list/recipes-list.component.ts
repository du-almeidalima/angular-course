import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../../core/services/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  public recipes: RecipeModel[];
  public recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    // Subscribing to recipes changes
    this.recipesSubscription = this.recipeService.recipesObservable.subscribe(
      (recipeList: RecipeModel[]) => {
        this.recipes = recipeList;
      }
    );
  }

  // Important to prevent memory leaks
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
