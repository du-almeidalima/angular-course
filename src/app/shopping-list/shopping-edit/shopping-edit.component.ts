import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  public onAddItem(form: NgForm): void {
    const { value } = form;

    const itemName = value.itemName;
    const itemAmount = + value.itemAmount;

    const newIngredient = new Ingredient(itemName, itemAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
