import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {RecipesComponent} from './recipes/recipes.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipes-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import {AppRoutesModule} from "./app-routes.module";
import {HomeComponent} from './home/home.component';
import {NoRecipeComponent} from './recipes/no-recipe/no-recipe.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import { ControlMessagesComponent } from './shared/components/control-messages/control-messages.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./core/auth/auth.component";
import {SpinnerComponent} from "./shared/components/loading-spinner/loading-spinner.component";
import {FeedbackMessageComponent} from "./shared/components/feedback-message/feedback-message.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    HomeComponent,
    NoRecipeComponent,
    RecipeEditComponent,
    ControlMessagesComponent,
    SpinnerComponent,
    FeedbackMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
