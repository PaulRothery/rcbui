import { Component, Input, OnInit } from '@angular/core';
import { RecipeBrewer } from 'src/app/classes/recipe-brewer';
import { BrewerService } from 'src/app/services/brewer.service';

@Component({
  selector: 'recipe-brewer',
  templateUrl: './recipe-brewer.component.html',
  styleUrls: ['./recipe-brewer.component.css']
})
export class RecipeBrewerComponent implements OnInit {

  
  brewers?: any[];


  @Input() recipeBrewers! : RecipeBrewer[];
  @Input() id!: string;
  
  constructor(
    private brewerService: BrewerService
  ) {}

  
  ngOnInit(): void {
    console.log('getting brewers ' + this.id);
    this.brewerService.getAll().subscribe((brewers) => (this.brewers = brewers));
  }

  addRow() {
  console.log('adding brewer for recipe id = ' + this.id);
    let recipeBrewer = new RecipeBrewer;
    recipeBrewer.name = '';
    recipeBrewer.recipeId = this.id;
    this.recipeBrewers.push(recipeBrewer);
   
  }

  removeRow(recipeBrewer: RecipeBrewer) {
    let index: any = this.recipeBrewers?.indexOf(recipeBrewer);
    this.recipeBrewers?.splice(index, 1);
  }

  nameChange(name: string) {
    this.recipeBrewers[this.recipeBrewers.length - 1].name = name;  
  }  

  nameIsEmpty(name: string): boolean {

    if (name) return false;
    return true;
  } 
  
  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

     if (this.recipeBrewers?.length === 0) {
      this.addRow();
    }

  }
}
