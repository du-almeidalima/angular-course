import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../models/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // Properties
  @ViewChild('itemNameInput', { static: true })
  public itemName: ElementRef;

  @ViewChild('amountInput', { static: true })
  public amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  public onAddItem(): void {

    const ingName = this.itemName.nativeElement.value;
    const ingAmount = this.amount.nativeElement.value;

    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}

/**
 * Just a basic gathering data from view/template and sending it out through an event (@Output)
 * Note: Remember, to access a referenceElement value use nativeElement property
 */
