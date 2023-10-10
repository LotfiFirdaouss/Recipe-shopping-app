import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput',{static:false}) nameInput: ElementRef;
  @ViewChild('amountInput',{static:false}) amountInput: ElementRef;
  ingredient: Ingredient = new Ingredient('',0);

  constructor(
    private shoppingListService: ShoppingListService
  ){}

  onAddIngredient() {
    this.ingredient.name = this.nameInput.nativeElement.value;
    this.ingredient.amount = this.amountInput.nativeElement.value;
    this.shoppingListService.addIngredient(this.ingredient);
  }

}
