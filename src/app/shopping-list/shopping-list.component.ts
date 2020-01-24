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
    this.ingredients = this.shoppingListService.ingredients;

    this.ingredientSubscription = this.shoppingListService.ingredientObserver.subscribe(
      (ingredientsUpdated: Ingredient[]) => {
        this.ingredients = ingredientsUpdated;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
}

/**
 * We also need to listen whenever the Ingredients change, because this component doesn't have the original array ref
 * just a copy of it
 */
