import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hop } from 'src/app/classes/hop';
import { RecipeHop } from 'src/app/classes/recipe-hop';
import { HopService } from 'src/app/services/hop.service';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'recipe-hop',
  templateUrl: './recipe-hop.component.html',
  styleUrls: ['./recipe-hop.component.css']
})
export class RecipeHopComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  hop!: Hop;
  hops?: any[];

  @Input() recipeHops! : RecipeHop[];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private hopService: HopService
  ) {}

  ngOnInit(): void {

    this.hopService.getAll().subscribe((hops) => (this.hops = hops));
    
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
    });


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
    this.recipeHops[this.recipeHops.length - 1].time = newValue;  
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
      
    return totalHops;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
 

   
  }
  
  
}