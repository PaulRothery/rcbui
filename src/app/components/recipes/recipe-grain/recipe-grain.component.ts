import { ConditionalExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeGrain } from 'src/app/classes/recipe-grain';
import { GrainService } from 'src/app/services/grain.service';

@Component({
  selector: 'recipe-grain',
  templateUrl: './recipe-grain.component.html',
  styleUrls: ['./recipe-grain.component.css']
})
export class RecipeGrainComponent implements OnInit {

  grains?: any[];
  
  @Input() recipeGrains!: RecipeGrain[];
  @Input() id!: string;
 

  pct!: number;

  constructor(
    private grainService: GrainService
  ) {}

  ngOnInit(): void {

    console.log('recipe grains init ' + this.recipeGrains.length);
    this.grainService.getAll().subscribe((grains) => (this.grains = grains));
   
  

  }

  calculatePercentage(quantity: number)  {

    let totalQuantity = 0;
    for(let i=0;i<this.recipeGrains.length ;i++){  
      totalQuantity = totalQuantity + this.recipeGrains[i].quantity;
    }
      
    return quantity / totalQuantity * 100;
  }

  calculateTotalGrist()  {

    if (! this.recipeGrains) {
      return 0
    }
  //  console.log('calculating total grist ' + this.recipeGrains)
    let totalGrist = 0;
    for(let i=0;i<this.recipeGrains.length ;i++){  
      totalGrist = (totalGrist + this.recipeGrains[i].quantity);
    }
    
    // requires toPrecision to counter the screwy way addition works
   // return parseFloat(totalGrist.toPrecision(3));
   return Math.round(totalGrist * 100) / 100;

  }
  
  addRow() {
    console.log('adding row for recipe id = ' + this.id);
    let recipeGrain = new RecipeGrain;
    recipeGrain.name = '';
    recipeGrain.recipeId = this.id;
    recipeGrain.quantity = 0;
    recipeGrain.color = 0;
    this.recipeGrains.push(recipeGrain);
    console.log('existing grains = ' + this.grains?.length);
  
  }

  removeRow(recipeGrain: RecipeGrain) {
    let index: any = this.recipeGrains?.indexOf(recipeGrain);
    this.recipeGrains?.splice(index, 1);
  }

  nameChange(name: string, color: number) {
    console.log('adding new name, color = ' + color)
    this.recipeGrains[this.recipeGrains.length - 1].name = name; 
    this.recipeGrains[this.recipeGrains.length - 1].color = color; 
     
  }  

  quantityChange(newValue: number) {
    console.log('grain qty change ' + newValue);
    this.calculatePercentage(newValue);
  }    

  nameIsEmpty(name: string): boolean {

    if (name) return false;
    return true;
  }  

  
  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

    if (this.recipeGrains?.length === 0) {
     this.addRow();
   }

   
 }

  
}