import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from 'rxjs';
import {map} from "rxjs/operators";
import {Recipe} from '../../../shared/models/recipe.model';
import * as fromApp from "../../../store/app.reducer";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[];
  public storeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('recipes')
      .pipe( map(recipesState => recipesState.recipes))
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  // Important to prevent memory leaks
  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
