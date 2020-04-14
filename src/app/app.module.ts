import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from "./core/auth/auth.component";
import {HeaderComponent} from "./header/header.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipesListComponent} from "./recipes/recipes-list/recipes-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {ControlMessagesComponent} from "./shared/components/control-messages/control-messages.component";
import {FeedbackMessageComponent} from "./shared/components/feedback-message/feedback-message.component";
import {NoRecipeComponent} from "./recipes/no-recipe/no-recipe.component";
import {ShoppingEditComponent} from "./shopping-list/shopping-edit/shopping-edit.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {SpinnerComponent} from "./shared/components/loading-spinner/loading-spinner.component";
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import {RecipeItemComponent} from "./recipes/recipes-list/recipe-item/recipe-item.component";
import {AppRoutesModule} from "./app-routes.module";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {MessageMapService} from "./shared/services/message-map.service";
import {PlaceholderDirective} from "./shared/directives/placeholder.directive";

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
    HomeComponent,
    NoRecipeComponent,
    RecipeEditComponent,
    ControlMessagesComponent,
    SpinnerComponent,
    FeedbackMessageComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageMapService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
