import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from "./core/auth/auth.component";
import {HeaderComponent} from "./header/header.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingListComponent} from "./modules/shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "./modules/shopping-list/shopping-edit/shopping-edit.component";
import {AppRoutesModule} from "./app-routes.module";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {RecipesModule} from "./modules/recipes/recipes.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpClientModule,
    RecipesModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
