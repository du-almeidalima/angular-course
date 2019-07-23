import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // Properties
  private currentRecipe: RecipeModel;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // We're receiving this "data" from the resolver in the RouterModule
    // For component initialization
    this.currentRecipe = this.route.snapshot.data['recipe'];

    // For changes in the current component
    this.route.data.subscribe(
      (data: Data) => {
        this.currentRecipe = data['recipe']
      }
    )
  }

  // Methods
  private onSendToShoppingList(): void {
    this.shoppingListService.addIngredientsArray(this.currentRecipe.ingredients);
  }

  // This method is just for demonstrating the approach for navigating programmatically, usually you'd use:
  // - routerLink to navigate on click
  // - programmatically navigation to execute some logic before doing so
  // - resolvers to fetch data that te component being loaded will need
  private onEditRecipe(): void{
    this.router.navigate(['../', 'edit', this.currentRecipe.id], {relativeTo: this.route});
    // this.route = <domain>/recipes/edit/2
  }
}
