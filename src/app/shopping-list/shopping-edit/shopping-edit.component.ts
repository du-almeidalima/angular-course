import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../models/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Used to edit
  public ingredientIndex: number;
  @ViewChild('f', {static: true})
  private ingredientForm: NgForm;

  private selectIngredientSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.selectIngredientSubscription = this.shoppingListService.selectedIngredient
      .subscribe((index: number) => {
        this.ingredientIndex = index;

        // Update the form for the selected Ingredient
        const editedIngredient = this.shoppingListService.getIngredientByIndex(index);
        this.ingredientForm.setValue({
          name: editedIngredient.name,
          amount: editedIngredient.amount
        })
      })
  }

  ngOnDestroy(): void {
    this.selectIngredientSubscription.unsubscribe();
  }

  public onAddItem(form: NgForm): void {
    const { name, amount } = form.value;

    this.shoppingListService.addIngredient(new Ingredient(name, amount));
    this.ingredientForm.reset();
  }
}

/**
 * To edit an Ingredient, the ShoppingList component have a click listener on every Ingredient listed, and whenever it
 * gets clicked on, it calls the ShoppingList service to emmit a event ".next()" with the index of the selected
 * ingredient.
 * this component is subscribed to this event and updates the item index
 */
