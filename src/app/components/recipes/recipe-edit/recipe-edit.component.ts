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
  submitted = false;
  loading = false;
  recipe!: Recipe;

  // indicator to show whether were adding a new recipe,
  // cloning or updating an exitng one
  isAddMode: boolean = false;
  isEditMode: boolean = false;
  isCloneMode: boolean = false;
 

  enteredDate!: NgbDate;
  newDate!: Date;
  estimatedDuration: number = 0;

 // tog!: number;

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

   // this.recipe = getEmptyRecipe();
    
    this.enteredDate = this.calendar.getToday();

    // get the list of statuses from the server
    this.recipeStatusService.getAll().subscribe((recipeStatuses) => (this.recipeStatuses = recipeStatuses));

    this.id = this.route.snapshot.params['id'];
    if(!this.id) {
     this.isAddMode = true
    } else if (this.route.snapshot.url[2]) {
      this.isCloneMode= true
    } else {
      this.isEditMode = true;
    }
    console.log('add mode ' + this.isAddMode)
    console.log('edit mode ' + this.isEditMode)
    console.log('clone mode ' + this.isCloneMode)

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      status: [''],
      batchId: ['', Validators.required],
      previousBatchId: ['', Validators.required],
      subBatchId: [''],
      date: [''],
      estimatedDuration: [''],
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

     // initialize an empty recipe this is required when we are adding one from a blank page
     // and also for updating one because the html will attempt to calculate fields
     // before they are fetched from the server and will throw exceptions
     //after initialization attach the empty child records to the form because if they
     // are not set when adding a recipe we need to have empty object values instead of
     // just empty  
     this.recipe = getEmptyRecipe();
     this.form.controls['recipeGrains'].setValue(this.r.recipeGrains);
     this.form.controls['recipeHops'].setValue(this.r.recipeHops);
     this.form.controls['recipeSalts'].setValue(this.r.recipeSalts);
     this.form.controls['recipeBrewers'].setValue(this.r.recipeBrewers);
     this.form.controls['brewDays'].setValue(this.r.brewDays);
     this.form.controls['fermentationLogs'].setValue(this.r.fermentationLogs);
 
    // select the required recipe for edit and clone mode 
    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe( 
            data => {
              this.recipe = new Recipe;
              this.recipe = data[0];
              this.recipe.id = this.id;
              this.form.patchValue(this.recipe)
              this.estimatedDuration = this.r.estimatedDuration

              if (this.isCloneMode) {
                this.initializeForClone();
              }
            },
            error => console.log('err ' + error),
          );

    } else {
      this.recipe = getEmptyRecipe();
    }
  }
   
  // set recipe to be cloned
  // associated records must have id and recipeid removed because they will 
  // be created anew in he server
  // brewers and fermentation logs will be reset because they will be different
  // in the clone
  private initializeForClone() {

    this.r.id = "";
    this.r.status = 'INITIAL';
    this.r.previousBatchId = this.r.batchId;
    this.r.batchId = "";
    this.r.date = new Date(Date.now());

    for (let i = 0; i < this.r.recipeGrains.length; i++) {
      this.r.recipeGrains[i].id = "";
      this.r.recipeGrains[i].recipeId = "";
    }

    for (let i = 0; i < this.r.recipeHops.length; i++) {
      this.r.recipeHops[i].id = "";
      this.r.recipeHops[i].recipeId = "";
    }

    for (let i = 0; i < this.r.recipeSalts.length; i++) {
      this.r.recipeSalts[i].id = "";
      this.r.recipeSalts[i].recipeId = "";
    }

    for (let i = 0; i < this.r.recipeAdjuncts.length; i++) {
      this.r.recipeAdjuncts[i].id = "";
      this.r.recipeAdjuncts[i].recipeId = "";
    }

    let recipeBrewers: RecipeBrewer[] = [];
    this.r.recipeBrewers = recipeBrewers;

    for (let i = 0; i < this.r.brewDays.length; i++) {
      this.r.brewDays[i].id = "";
      this.r.brewDays[i].recipeId = "";
    }

    let fermentationLogs: FermentationLog[] = [];
    this.r.fermentationLogs = fermentationLogs;

    this.form.patchValue(this.recipe);
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

    // a clone is effectively adding a new recipe
    if (this.isEditMode) {
        this.updateRecipe();
    } else {
        this.createRecipe();
    }

  }
  
  updateRecipe() {
   
    // if the date has changed then it will be set otherwise just ignore
    if (this.enteredDate) {
      this.newDate = new Date('"' +  this.enteredDate.year + '-' + this.enteredDate.month + '-' + this.enteredDate.day + '"');
      this.form.controls['date'].setValue(this.newDate);
    }
  
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
            this.router.navigate(['/recipes']);
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

  changeDuration() {

    this.r.estimatedDuration = this.estimatedDuration
    console.log('changing duration ' + this.r.estimatedDuration)
    this.f.estimatedDuration.setValue(this.r.estimatedDuration)
   
  }

  calculateCompletionDate(): Date {

    // if the recipe date is not set just exit with a new date declaration
    if (!this.r) {
      return new Date()
    }
    
    // get the ngbDate used by the datepicker and convert it to the date on the recipe
    this.r.date =  new Date(this.enteredDate.year, this.enteredDate.month - 1, this.enteredDate.day);
    let completionDate = new Date(this.r.date);
    completionDate.setDate(completionDate.getDate() + (this.r.estimatedDuration))
  
    return completionDate
 
  } 

  calculateOriginalGravity(): number  {
       return this.f.targetEff.value * 2;    
  }

  // The overall color is determined by the color and quantity
  // of each grain in the recipe
  calculateColor(): number  {
   
    if(!this.f.recipeGrains.value  ) {
      return 0
    }

    // first sum the color and quantity of each grain
    const rgs: RecipeGrain[] = [];
    this.f.recipeGrains.value.forEach((val: RecipeGrain) => rgs.push(Object.assign({}, val)));
   
    let totalColor: number = 0;
    rgs.forEach( (element) => {
      let grainColor = element.quantity * element.color;
      totalColor += grainColor;
    });

   // next adjust the color based on the quantity being brewed
   totalColor = totalColor / (this.f.batchYield.value * 31);
 
   // and a couple of adjustments to finalze the color
   totalColor = totalColor * 1.4922;
   totalColor = totalColor ** 0.6859;

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

