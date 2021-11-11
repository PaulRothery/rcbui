import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HopComponent } from './components/ingredients/hop/hop.component';
import { HopEditComponent } from './components/ingredients/hop-edit/hop-edit.component';
import { GrainComponent } from './components/ingredients/grain/grain.component';
import { NoPageFoundComponent } from './components/nopagefound/nopagefound.component';
import { YeastComponent } from './components/ingredients/yeast/yeast.component';
import { AdjunctComponent } from './components/ingredients/adjunct/adjunct.component';
import { YeastEditComponent } from './components/ingredients/yeast-edit/yeast-edit.component';
import { GrainEditComponent } from './components/ingredients/grain-edit/grain-edit.component';
import { AdjunctEditComponent } from './components/ingredients/adjunct-edit/adjunct-edit.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'grains', component: GrainComponent },
 
  { path: 'home', component: HomeComponent },
 
  { path: 'hops', component: HopComponent },
  { path: 'hop-edit/:id', component: HopEditComponent },
  { path: 'hop-edit', component: HopEditComponent },
  
  { path: 'yeasts', component: YeastComponent },
  { path: 'yeast-edit/:id', component: YeastEditComponent },
  { path: 'yeast-edit', component: YeastEditComponent },

  { path: 'grains', component: GrainComponent },
  { path: 'grain-edit/:id', component: GrainEditComponent },
  { path: 'grain-edit', component: GrainEditComponent },

  { path: 'adjuncts', component: AdjunctComponent },
  { path: 'adjunct-edit/:id', component: AdjunctEditComponent },
  { path: 'adjunct-edit', component: AdjunctEditComponent },
  
  { path: 'recipes', component: RecipeComponent },
  { path: 'recipe-edit/:id', component: RecipeEditComponent },
  { path: 'recipe-edit', component: RecipeEditComponent },

  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
