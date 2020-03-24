import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../shared/models/recipe.model';
import {ShoppingListService} from '../../core/services/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../../core/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  // Properties
  public currentRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
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
