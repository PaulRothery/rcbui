import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { BrewDay } from 'src/app/classes/brewday';
import { FermentationLog } from 'src/app/classes/fermentationlog';
import { Recipe } from 'src/app/classes/recipe';
import { RecipeAdjunct } from 'src/app/classes/recipe-adjunct';
import { RecipeBrewer } from 'src/app/classes/recipe-brewer';
import { RecipeGrain } from 'src/app/classes/recipe-grain';
import { RecipeHop } from 'src/app/classes/recipe-hop';
import { RecipeSalt } from 'src/app/classes/recipe-salt';
import { RecipeStatusService } from 'src/app/services/enums/recipe-status.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  
  recipeStatuses!: any[];

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  recipe!: Recipe;

  enteredDate!: NgbDate;
  newDate!: Date;
  rtmp!: string;

  tog!: number;

  public isShowGrain:boolean = false;
  public isShowHop:boolean = false;
  public isShowSalt:boolean = false;
  public isShowAdjunct:boolean = false;
  public isShowBrewer:boolean = false;
  public isShowBrewDay:boolean = false;
  public isShowFermentationLog:boolean = false;
 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private recipeStatusService: RecipeStatusService,
    public datepipe: DatePipe,
    public calendar: NgbCalendar
  ) {}

  ngOnInit(): void {

 

    console.log('recipe edit oninit ' + this.isShowGrain);

    this.enteredDate = this.calendar.getToday();

    this.recipeStatusService.getAll().subscribe((recipeStatuses) => (this.recipeStatuses = recipeStatuses));

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      status: [''],
      batchId: ['', Validators.required],
      previousBatchId: ['', Validators.required],
      subBatchId: [''],
      date: [''],
      estimatedDuration: ['', Validators.required],
      type: ['', Validators.required],
      batchYield: ['', [Validators.pattern(numberPattern)]],
      targetEff: ['', [Validators.pattern(numberPattern)]],
      targetOG: [''],
      targetIbus: [''],
      targetColor: [''],
      recipeGrains: [''],
      recipeHops: [''],
      recipeSalts: [''],
      recipeBrewers: [''],
      brewDays: [''],
      fermentationLogs: [''],
     });

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe( 
            data => {
              this.recipe = new Recipe;
              this.recipe = data[0];
              this.recipe.id = this.id;
              this.form.patchValue(this.recipe)
            },
            error => console.log('err ' + error),
          );

    } else {
      this.recipe = getEmptyRecipe();
    }
  }

   
  toggleDisplayHop() {
    this.isShowHop = !this.isShowHop;

  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  get r(): Recipe {
    return this.recipe;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
 
    this.loading = true;
    if (this.isAddMode) {
        this.createRecipe();
    } else {
        this.updateRecipe();
    }

  }
  
  updateRecipe() {
   
    // if the date has changed then it will be set otherwise just ignore
    if (this.enteredDate) {
      this.newDate = new Date('"' +  this.enteredDate.year + '-' + this.enteredDate.month + '-' + this.enteredDate.day + '"');
      this.form.controls['date'].setValue(this.newDate);
    }
  

   // console.log('fermentationlog date ' + this.form.controls['FermentationLogs.date'])
    this.service.update(this.recipe.id, this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
     
          console.log('route = ' + this.route);
          this.router.navigate(['/recipe-edit/' + this.recipe.id]);
        
        },
        error: error => {
            console.log(error);
            this.loading = false;
        }
    });

  }

  createRecipe() {

    this.service.create(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {

   
            this.router.navigate(['/recipe-edit']);
        },
        error: error => {

            this.loading = false;
        }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  calculateCompletionDate(): Date {

    // get hte ngbDate used by the datepicker and convert it to the date on the recipe
    console.log('calc entered date ' + this.enteredDate.year + '/' + this.enteredDate.month  + '/' +  this.enteredDate.day);
    this.r.date =  new Date(this.enteredDate.year, this.enteredDate.month - 1, this.enteredDate.day);
    console.log('calc recipe date ' + this.r.date);
   
    let completionDate = new Date(this.r.date);
    completionDate.setDate(completionDate.getDate() + (this.r.estimatedDuration))
  
    console.log('calc comp date ' + completionDate);
  
    return completionDate
 
  } 

  calculateOriginalGravity(): number  {
       return this.f.targetEff.value * 2;
    
      
  }

  // The overall color is determined by the color and quantity
  // of each grain in the recipe
  calculateColor(): number  {
   
//    console.log(' recipe grains value ' + this.f.recipeGrains.value.size  )
    if(!this.f.recipeGrains.value  ) {
      return 0
    }

   // first sum the color and quantity of each grain
    const rgs: RecipeGrain[] = [];
    this.f.recipeGrains.value.forEach((val: RecipeGrain) => rgs.push(Object.assign({}, val)));
   
    let totalColor: number = 0;
    rgs.forEach( (element) => {
  //    console.log('elem Quantity ' + element.quantity);
   //   console.log('elem Color ' + element.color);
      let grainColor = element.quantity * element.color;
      totalColor += grainColor;
    });

   //console.log('totalColor after summing grains ' + totalColor);  

   // next adjust the color based on the quantity being brewed
   totalColor = totalColor / (this.f.batchYield.value * 31);
   //console.log('totalColor after yield adjustment ' + totalColor);  

   // and a couple of adjustments to finalze the color
   totalColor = totalColor * 1.4922;
   //console.log('totalColor after x1.4922 adjustment ' + totalColor);  

   totalColor = totalColor ** 0.6859;
   //console.log('totalColor after exponential adjustment ' + totalColor);  
 
   return totalColor;  
  }

  statusChange(name: string) {
    this.f.status.setValue(name);  
  }
}
function Output() {
  throw new Error('Function not implemented.');
}



// if we are  adding a new recipe the form will be empty 
// that is an issue because we use parst of the form to calculate other fields on the 
// screen so if they are empty (i.e. undefined) exceptions will be thrown
// therefore create just enough of a populated recipe to allow the caluclations
function getEmptyRecipe(): Recipe {

  let recipe = new Recipe;
      
  recipe.date =  new Date(Date.now());
  recipe.estimatedDuration = 0;

  let recipeGrains: RecipeGrain[] = [];
  recipe.recipeGrains = recipeGrains;
  let recipeGrain = new RecipeGrain;
  recipeGrain.name = '';
  recipeGrain.quantity = 0;
  recipeGrain.color = 0;
  recipe.recipeGrains.push(recipeGrain);
 
  let recipeHops: RecipeHop[] = [];
  recipe.recipeHops = recipeHops;
 
  let recipeSalts: RecipeSalt[] = [];
  recipe.recipeSalts = recipeSalts;

  let recipeAdjuncts: RecipeAdjunct[] = [];
  recipe.recipeAdjuncts = recipeAdjuncts;

  let recipeBrewers: RecipeBrewer[] = [];
  recipe.recipeBrewers = recipeBrewers;

  let brewDays: BrewDay[] = [];
  recipe.brewDays = brewDays;
  let brewDay = new BrewDay;
  brewDay.mashInTime = new Date(Date.now());
  recipe.brewDays.push(brewDay);
 

  let fermentationLogs: FermentationLog[] = [];
  recipe.fermentationLogs = fermentationLogs

  return recipe;
}

