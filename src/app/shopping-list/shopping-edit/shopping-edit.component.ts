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
  public ingredientIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.selectedIngredient
      .subscribe((index: number) => {
        this.ingredientIndex = index;

        console.log(index);
      })
  }

  public onAddItem(form: NgForm): void {
    const { name, amount } = form.value;

    console.log(name, amount);
    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }
}

/*
 * Since in the ShoppingListService the "itemName" is used as a key for unique Items, it either need to know the Item
 * index that is being edited, nor if it's new or already exists.
 */
