import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
      new Recipe(
        'Ratatouille', 
        'a delicious meal',
        'https://lecoupdegrace.ca/app/uploads/2023/03/ratatouille-parfaite-comme-dans-le-film-inpage.jpg',
        [
          new Ingredient('Meat',1),
          new Ingredient('Tomato',2),
          new Ingredient('Carrot',3)
        ]),
      new Recipe(
        'Spaghetti', 
        'an italian meal',
        'https://images.immediate.co.uk/production/volatile/sites/30/2018/07/RedPepperAnchovySpaghetti-copy-1dec261.jpg?quality=90&resize=556,505',
        [
          new Ingredient('Pasta',3),
          new Ingredient('Tomato',2),
          new Ingredient('Cheese',1),
        ]),
    ];

  constructor(
    private shoppingListService: ShoppingListService
  ){}  

  getRecipes() {
    return this.recipes.slice(); // get a copy of the recipes array
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
    
}