import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  subscription : Subscription;
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanges.subscribe(
      (newRecipes) => {
        this.recipes = newRecipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
