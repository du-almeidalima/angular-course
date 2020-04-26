import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from "@ngrx/store";
import {Subscription} from 'rxjs';

import {Ingredient} from '../../../shared/models/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import * as shoppingList from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Used to edit
  public ingredientIndex: number;
  public editMode = false;

  private selectIngredientSubscription: Subscription;

  @ViewChild('f')
  private ingredientForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ){}

  ngOnInit(): void {
    this.selectIngredientSubscription = this.shoppingListService.selectedIngredient
      .subscribe((index: number) => {

        this.ingredientIndex = index;
        this.editMode = true;
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

  public onSubmit(form: NgForm): void {
    const { name, amount } = form.value;
    const ingredient = new Ingredient(name, amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(ingredient, this.ingredientIndex);
    } else {
      // Creating the AddIngredient Action
      this.store.dispatch(new shoppingList.AddIngredient(ingredient))
    }
    this.clearForm();
  }

  public onClear(): void {
    this.clearForm();
  }

  public onDelete(): void {
    try {
      this.shoppingListService.deleteIngredient(this.ingredientIndex);
    } catch (e) {
      if (e instanceof RangeError) {
        console.error(e.name, e.message, e.stack);
      }
    }

    this.clearForm();
  }

  // Utils
  private clearForm(): void{
    this.editMode = false;
    this.ingredientIndex = null;

    this.ingredientForm.reset()
  }
}

/**
 * To edit an Ingredient, the ShoppingList component have a click listener on every Ingredient listed, and whenever it
 * gets clicked on, it calls the ShoppingList service to emmit a event ".next()" with the index of the selected
 * ingredient.
 * this component is subscribed to this event and updates the item index
 */
