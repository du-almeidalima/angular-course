import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/models/ingredient.model';
import {ShoppingListService} from '../core/services/shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[];
  private ingredientSubscription: Subscription;

  constructor( private shoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredientsUpdated: Ingredient[]) => {
        this.ingredients = ingredientsUpdated;
      }
    );

    this.ingredients = this.shoppingListService.ingredients;
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  editIngredient(ingredientIndex: number): void {
    this.shoppingListService.selectIngredientToEdit(ingredientIndex);
  }
}
