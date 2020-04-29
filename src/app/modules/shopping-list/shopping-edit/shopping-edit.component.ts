import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from "@ngrx/store";
import {Subscription} from 'rxjs';

import {Ingredient} from '../../../shared/models/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

/* This is the convention for importing the reducer file */
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Used to edit
  public editMode = false;
  private selectIngredientSubscription: Subscription;
  @ViewChild('f') private ingredientForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ){}

  ngOnInit(): void {
    this.selectIngredientSubscription = this.store.select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.ingredientForm.setValue({
            name: stateData.editedIngredient.name,
            amount: stateData.editedIngredient.amount
          })
        } else {
          this.editMode = false;
        }
      })
  }

  ngOnDestroy(): void {
    this.selectIngredientSubscription.unsubscribe();
  }

  public onSubmit(form: NgForm): void {
    const { name, amount } = form.value;
    const ingredient = new Ingredient(name, amount);

    if (this.editMode) {
      // The index of selected item is already on State
      const action = new ShoppingListActions.UpdateIngredient(ingredient);
      this.store.dispatch(action);
    } else {
      const action = new ShoppingListActions.AddIngredient(ingredient);
      this.store.dispatch(action);
    }
    this.clearForm();
  }

  public onClear(): void {
    this.clearForm();
  }

  public onDelete(): void {
    // The index of selected item is already on State
    this.store.dispatch(new ShoppingListActions.RemoveIngredient());
    this.clearForm();
  }

  // Utils
  private clearForm(): void{
    this.editMode = false;
    this.ingredientForm.reset()
  }
}

/**
 * To edit an Ingredient, the ShoppingList component have a click listener on every Ingredient listed, and whenever it
 * gets clicked on, it calls the ShoppingList service to emmit a event ".next()" with the index of the selected
 * ingredient.
 * this component is subscribed to this event and updates the item index
 */
