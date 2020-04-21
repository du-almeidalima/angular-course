import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {ShoppingListModule} from "./modules/shopping-list/shopping-list.module";
import {AppRoutesModule} from "./app-routes.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    CoreModule,
    ShoppingListModule,
    SharedModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
