import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../shared/models/recipe';
import {RecipeService} from '../../core/services/recipes/recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[];
  public recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    // Subscribing to recipes changes
    this.recipesSubscription = this.recipeService.recipesObservable.subscribe(
      (recipeList: Recipe[]) => {
        this.recipes = recipeList;
      }
    );
  }

  // Important to prevent memory leaks
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
