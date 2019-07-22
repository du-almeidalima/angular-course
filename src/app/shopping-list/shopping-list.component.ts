import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[];

  constructor( private shoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingredients;

    this.shoppingListService.ingredientArrayUpdate.subscribe(
      (ingredientsUpdated: Ingredient[]) => {
        console.table(this.ingredients, ingredientsUpdated);
        this.ingredients = ingredientsUpdated;
      }
    );
  }

}

/**
 * We also need to listen whenever the Ingredients change, because this component doesn't have the original array ref
 * just a copy of it
 */
