import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/Recipes', pathMatch: 'full' },
    { 
        path:'Recipes',
        loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    },
    { 
        path:'Shopping',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    { 
        path:'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule {

}