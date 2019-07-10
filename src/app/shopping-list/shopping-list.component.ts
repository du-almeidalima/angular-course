import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Banana', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Broccoli', 2),
  ];

  constructor() { }

  ngOnInit() {
  }

  public onAddedIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
  }

}
