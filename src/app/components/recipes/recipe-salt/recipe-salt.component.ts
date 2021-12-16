import { Component, Input, OnInit } from '@angular/core';
import { RecipeSalt } from 'src/app/classes/recipe-salt';
import { SaltService } from 'src/app/services/salt.service';

@Component({
  selector: 'recipe-salt',
  templateUrl: './recipe-salt.component.html',
  styleUrls: ['./recipe-salt.component.css']
})
export class RecipeSaltComponent implements OnInit {

  salts?: any[];
  
  @Input() recipeSalts!: RecipeSalt[];
  @Input() id!: string;
 

  constructor(
    private saltService: SaltService
  ) {}

  ngOnInit(): void {

    console.log('getting salts ' + this.id);
    this.saltService.getAll().subscribe((salts) => (this.salts = salts));
   
  

  }


  addRow() {
    console.log('adding row for recipe id = ' + this.id);
    let recipeSalt = new RecipeSalt;
    recipeSalt.name = '';
    recipeSalt.recipeId = this.id;
    recipeSalt.mashQuantity = 0;
    recipeSalt.lauterQuantity = 0;
    recipeSalt.kettleQuantity = 0;
    this.recipeSalts.push(recipeSalt);
    console.log('existing salts = ' + this.salts?.length);
  
  }

  removeRow(recipeSalt: RecipeSalt) {
    let index: any = this.recipeSalts?.indexOf(recipeSalt);
    this.recipeSalts?.splice(index, 1);
  }

  nameChange(name: string) {

    console.groupCollapsed('salt name change select -> ' + name)
    this.recipeSalts[this.recipeSalts.length - 1].name = name;  
  }  

  
  nameIsEmpty(name: string): boolean {

    if (name) return false;
    return true;
  }  

  
  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

    if (this.recipeSalts?.length === 0) {
     this.addRow();
   }

 }
  
}