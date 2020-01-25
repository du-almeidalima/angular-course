import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../models/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
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
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  editIngredient(ingredientIndex: number): void {
    this.shoppingListService.selectIngredientToEdit(ingredientIndex);
  }
}

/**
 * To edit an Ingredient, the ShoppingList component have a click listener on every Ingredient listed, and whenever it
 * gets clicked on, it calls the ShoppingList service to emmit a event ".next()" with the index of the selected
 * ingredient.
 * this component is subscribed to this event and updates the item index
 */
