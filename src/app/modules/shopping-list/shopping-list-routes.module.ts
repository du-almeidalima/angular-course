import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list.component";

const SHOPPING_LIST_ROUTES: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(SHOPPING_LIST_ROUTES)],
  exports: [RouterModule]
})
export class ShoppingListRoutesModule {

}
