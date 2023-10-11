import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  ingredient: Ingredient = new Ingredient('',0);
  subscription : Subscription;
  editMode = false;
  editedItemIndex : number;

  @ViewChild('shoppingForm') shoppingForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService
  ){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;

          // getting the item from the service
          this.ingredient = this.shoppingListService.getIngredient(this.editedItemIndex);

          // Loading the item to the form
          this.shoppingForm.setValue({
            'name': this.ingredient.name,
            'amount': this.ingredient.amount
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    // console.log(form.value.name);

    this.ingredient.name = form.value.name;
    this.ingredient.amount = form.value.amount;

    if(!this.editMode){
      this.shoppingListService.addIngredient(this.ingredient);
    }else{
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.ingredient);
    }

    this.editMode = false;
    this.shoppingForm.reset();


  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
