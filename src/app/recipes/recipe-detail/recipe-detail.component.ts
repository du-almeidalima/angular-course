import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ShoppingListService} from "../../core/services/shopping-list.service";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RecipeService} from "../../core/services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  // Properties
  public currentRecipe: RecipeModel;
  private recipeSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // For changes in the current component
    this.recipeSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.currentRecipe = data.recipe;
      }
    )
  }

  ngOnDestroy(): void {
    // This is not necessary for Angular Observables, but for custom it's
    this.recipeSubscription.unsubscribe();
  }

  // Methods
  public onSendToShoppingList(): void {
    this.shoppingListService.addIngredients(this.currentRecipe.ingredients);
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
