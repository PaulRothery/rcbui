import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GrainComponent } from './components/ingredients/grain/grain.component';
import { HopComponent } from './components/ingredients/hop/hop.component';
import { NoPageFoundComponent } from './components/nopagefound/nopagefound.component';
import { YeastComponent } from './components/ingredients/yeast/yeast.component';
import { AdjunctComponent } from './components/ingredients/adjunct/adjunct.component';
import { HopEditComponent } from './components/ingredients/hop-edit/hop-edit.component';
import { HopService } from './services/hop.service';
import { YeastEditComponent } from './components/ingredients/yeast-edit/yeast-edit.component';
import { GrainEditComponent } from './components/ingredients/grain-edit/grain-edit.component';
import { AdjunctEditComponent } from './components/ingredients/adjunct-edit/adjunct-edit.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeGrainComponent } from './components/recipes/recipe-grain/recipe-grain.component';
import { RecipeHopComponent } from './components/recipes/recipe-hop/recipe-hop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GrainComponent,
    HopComponent,
    NoPageFoundComponent,
    YeastComponent,
    AdjunctComponent,
    HopEditComponent,
    YeastEditComponent,
    GrainEditComponent,
    AdjunctEditComponent,
    HomeComponent,
    RecipeComponent,
    RecipeEditComponent,
    RecipeGrainComponent,
    RecipeHopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule
 
  ],
  providers: [HopService],
  bootstrap: [AppComponent],
})
export class AppModule {}
