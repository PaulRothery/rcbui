import { Component, Input, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { RecipeAdjunct } from 'src/app/classes/recipe-adjunct';
import { AdjunctService } from 'src/app/services/adjunct.service';

@Component({
  selector: 'recipe-adjunct',
  templateUrl: './recipe-adjunct.component.html',
  styleUrls: ['./recipe-adjunct.component.css']
})
export class RecipeAdjunctComponent implements OnInit {

  adjuncts?: any[];
  
  @Input() recipeAdjuncts!: RecipeAdjunct[];
  @Input() id!: string;
 
  enteredDate!: NgbDate;
  newDate!: Date;
  
  constructor(
    private adjunctService: AdjunctService
  ) {}

  ngOnInit(): void {

    console.log('getting adjuncts ' + this.id);
    this.adjunctService.getAll().subscribe((adjuncts) => (this.adjuncts = adjuncts));

  }

  addRow() {
    console.log('adding row for recipe id = ' + this.id);
    let recipeAdjunct = new RecipeAdjunct;
    recipeAdjunct.name = '';
    recipeAdjunct.recipeId = this.id;
    recipeAdjunct.quantity = 0;

    this.recipeAdjuncts.push(recipeAdjunct);
    console.log('existing adjuncts = ' + this.adjuncts?.length);
  
  }

  removeRow(recipeAdjunct: RecipeAdjunct) {
    let index: any = this.recipeAdjuncts?.indexOf(recipeAdjunct);
    this.recipeAdjuncts?.splice(index, 1);
  }

  nameChange(name: string) {

     this.recipeAdjuncts[this.recipeAdjuncts.length - 1].name = name;  
  }  

  
  nameIsEmpty(name: string): boolean {

    if (name) return false;
    return true;
  }  

  
  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

    if (this.recipeAdjuncts?.length === 0) {
     this.addRow();
   }

 }
  
 updateSelectedDate(date: NgbDate, index: number): NgbDate {

  console.log('selected date = ' + date)
  console.log('occurence = ' + index)
  this.newDate = new Date(
    date.year,
    date.month - 1,
    date.day);
  
    console.log('new date = ' + this.newDate)
 
  this.recipeAdjuncts[index].date = this.newDate;

  return date;
}
}
