import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from "@ngrx/store";

import {Recipe} from '../../../shared/models/recipe.model';
import {RecipeService} from '../recipe.service';

import * as fromApp from '../../../store/app.reducer'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  // Properties
  public currentRecipe: Recipe;

  constructor(private recipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // For changes in the current component
    this.route.params
      .subscribe((params: Params) => {
        const recipeId = +params.id;
        this.currentRecipe = this.recipeService.getRecipeById(recipeId)
      })
  }

  // Methods
  public onSendToShoppingList(): void {
    // this.shoppingListService.addIngredients(this.currentRecipe.ingredients);
    const action = new ShoppingListActions.AddIngredients(this.currentRecipe.ingredients);
    this.store.dispatch(action);
  }

  // This method is just for demonstrating the approach for navigating programmatically, usually you'd use:
  // - routerLink to navigate on click
  // - programmatically navigation to execute some logic before doing so
  // - resolvers to fetch data that te component being loaded will need
  public onEditRecipe(): void {
    // this.route = <domain>/recipes/edit/2
    this.router.navigate(['../', this.currentRecipe.id, 'edit'], {relativeTo: this.route});
  }

  public onRemoveRecipe(): void {
    this.recipeService.removeRecipeById(this.currentRecipe.id);
    this.router.navigate(['recipes']);
  }

}
