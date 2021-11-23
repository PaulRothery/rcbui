import { Component, Input, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Grain } from 'src/app/classes/grain';
import { RecipeGrain } from 'src/app/classes/recipe-grain';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { GrainService } from 'src/app/services/grain.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-grain',
  templateUrl: './recipe-grain.component.html',
  styleUrls: ['./recipe-grain.component.css']
})
export class RecipeGrainComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  grain!: Grain;
  grains?: any[];
  
  @Input() recipeGrains! : RecipeGrain[];
  pct!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private grainService: GrainService
  ) {}

  ngOnInit(): void {

    this.grainService.getAll().subscribe((grains) => (this.grains = grains));
    console.log('getting grains' + this.grains);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
    });


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