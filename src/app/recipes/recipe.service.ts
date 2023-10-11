import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

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
      new Recipe(
        'Tajine',
        'A tajine or tagine (Arabic: طاجين) is a North African dish, named after the earthenware pot in which it is cooked. It is also called maraq or marqa.',
        'https://images.radio-canada.ca/v1/alimentation/recette/4x3/tajine-poulet-soulard.jpg',
        [
          new Ingredient('Olive oil',3),
          new Ingredient('Tomato',2),
          new Ingredient('Potato',3),
          new Ingredient('Meat',1),
        ]
      )  
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

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }
    
  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanges.next(this.recipes.slice());
  }
}