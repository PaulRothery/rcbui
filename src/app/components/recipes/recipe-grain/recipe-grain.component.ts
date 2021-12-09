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

    console.log('getting grains ' + this.id);
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

    let totalGrist = 0;
    for(let i=0;i<this.recipeGrains.length ;i++){  
      totalGrist = totalGrist + this.recipeGrains[i].quantity;
    }
      
    return totalGrist;
  }
  
  addRow() {
    console.log('adding row for recipe id = ' + this.id);
    let recipeGrain = new RecipeGrain;
    recipeGrain.name = '';
    recipeGrain.recipeId = this.id;
    recipeGrain.quantity = 0;
    this.recipeGrains.push(recipeGrain);
    console.log('existing grains = ' + this.grains?.length);
  
  }

  removeRow(recipeGrain: RecipeGrain) {
    let index: any = this.recipeGrains?.indexOf(recipeGrain);
    this.recipeGrains?.splice(index, 1);
  }

  nameChange(name: string) {
    this.recipeGrains[this.recipeGrains.length - 1].name = name;  
  }  

  quantityChange(newValue: number) {
    console.log(newValue);
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