import { Component, Input, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { RecipeHop } from 'src/app/classes/recipe-hop';
import { HopService } from 'src/app/services/hop.service';


@Component({
  selector: 'recipe-hop',
  templateUrl: './recipe-hop.component.html',
  styleUrls: ['./recipe-hop.component.css']
})
export class RecipeHopComponent implements OnInit {

  hops?: any[];

  @Input() recipeHops! : RecipeHop[];
  @Input() id!: string;
 
  enteredDate!: NgbDate;
  newDate!: Date;
  
  constructor(
    private hopService: HopService
  ) {}

  ngOnInit(): void {
    this.hopService.getAll().subscribe((hops) => (this.hops = hops));
  }

  addRow() {
    console.log('adding row for recipe id = ' + this.id);
    let recipeHop = new RecipeHop;
    recipeHop.name = '';
    recipeHop.recipeId = this.id;
    recipeHop.quantity = 0;
    this.recipeHops.push(recipeHop);
  }

  removeRow(recipeHop: RecipeHop) {
    let index: any = this.recipeHops?.indexOf(recipeHop);
    this.recipeHops?.splice(index, 1);
  }
  
  nameChange(name: string) {
    this.recipeHops[this.recipeHops.length - 1].name = name;  
  }  

  quantityChange(newValue: number) {
    console.log(newValue);

  } 

  timeChange(newValue: number) {
   this.recipeHops.sort(function(a, b) { return b.time - a.time; })
 }    

  nameIsEmpty(name: string): boolean {

    if (name) return false;
    return true;
  } 

  calculateTotalHops()  {


    let totalHops = 0;
    for(let i=0;i<this.recipeHops.length ;i++){  
      totalHops = totalHops + this.recipeHops[i].quantity;
    }
      
    return Math.round(totalHops * 100) / 100;
   
  }

  
  // if there are no records to display add an empty row
  // so that one can be added
  // if there are rows ensure that they are listed in time descending order
  checkElements() {


 
    //  console.log('empty hops ' + this.recipeHops)
 

  if (!this.recipeHops || this.recipeHops?.length === 0) {
     this.addRow();
   } else {
    this.recipeHops.sort(function(a, b) { return b.time - a.time; })
   }


 }

 updateSelectedDate(date: NgbDate, index: number): NgbDate {

// console.log('selected date = ' + date)
//  console.log('occurence = ' + index)
  this.newDate = new Date(
    date.year,
    date.month - 1,
    date.day);
  
  //  console.log('new date = ' + this.newDate)
 
  this.recipeHops[index].date = this.newDate;

  return date;
}
  
}