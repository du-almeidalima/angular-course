import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit{

  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: { ingredients: Ingredient[]} }>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredientsUpdated: Ingredient[]) => {
    //     this.ingredients = ingredientsUpdated;
    //   }
    // );
    //
    // this.ingredients = this.shoppingListService.ingredients;
  }

  editIngredient(ingredientIndex: number): void {
    this.shoppingListService.selectIngredientToEdit(ingredientIndex);
  }
}

/*
 * In this component we're using our NgRx Store, we've already set it up in the AppModule.
 * For using so, we can inject it into our component, but we need to say what reducer we'll use in this component Store.
 * This reducer is defined in the AppModule in the StoreModule.forRoot(), we need to specify the same key in here.
 *
 * Yet, we need to tell what this reducer function yields. for the shoppingList, it returns a { Ingredients[]: ... }
 *
 * Finally, we can get access to the Store events changes by using the "store.select" method, with that, we can specify
 * what slice of the Store State we want, in this case the "shoppingList" part
 */
