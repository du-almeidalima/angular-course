import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {Subscription} from "rxjs";

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
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // We're receiving this "data" from the resolver in the RouterModule
    // For component initialization
    this.currentRecipe = this.route.snapshot.data['recipe'];

    // For changes in the current component
    this.recipeSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.currentRecipe = data['recipe']
      }
    )
  }

  ngOnDestroy(): void {
    // This is not necessary for Angular Observables, but for custom it's
    this.recipeSubscription.unsubscribe();
  }

  // Methods
  public onSendToShoppingList(): void {
    this.shoppingListService.addIngredientsArray(this.currentRecipe.ingredients);
  }

  // This method is just for demonstrating the approach for navigating programmatically, usually you'd use:
  // - routerLink to navigate on click
  // - programmatically navigation to execute some logic before doing so
  // - resolvers to fetch data that te component being loaded will need
  public onEditRecipe(): void{
    // this.route = <domain>/recipes/edit/2
    this.router.navigate(['../', 'edit', this.currentRecipe.id], {relativeTo: this.route});
  }

}
