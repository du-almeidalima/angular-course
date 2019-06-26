import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // Properties
  @ViewChild('itemNameInput')
  public itemName: ElementRef;

  @ViewChild('amountInput')
  public amount: ElementRef;

  // Events
  @Output()
  public onAddItemBtn = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  public onAddItem(): void{

    const ingName = this.itemName.nativeElement.value;
    const ingAmount = this.amount.nativeElement.value;

    const newIngredient = new Ingredient(ingName, ingAmount);
    this.onAddItemBtn.emit(newIngredient);
  }
}

/**
 * Just a basic gathering data from view/template and sending it out through an event (@Output)
 * Note: Remember, to access a referenceElement value use nativeElement property
*/
