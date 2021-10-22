import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GrainComponent } from './components/ingredients/grain/grain.component';
import { HopComponent } from './components/ingredients/hop/hop.component';
import { NoPageFoundComponent } from './nopagefound/nopagefound.component';
import { YeastComponent } from './components/ingredients/yeast/yeast.component';
import { AdjunctComponent } from './components/ingredients/adjunct/adjunct.component';
import { HopEditComponent } from './components/ingredients/hop-edit/hop-edit.component';
import { HopService } from './services/hop.service';
import { YeastEditComponent } from './components/ingredients/yeast-edit/yeast-edit.component';
import { GrainEditComponent } from './components/ingredients/grain-edit/grain-edit.component';
import { AdjunctEditComponent } from './components/ingredients/adjunct-edit/adjunct-edit.component';


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
    AdjunctEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HopService],
  bootstrap: [AppComponent],
})
export class AppModule {}
