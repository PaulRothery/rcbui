import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Recipe } from 'src/app/classes/recipe';
import { RecipeGrain } from 'src/app/classes/recipe-grain';
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
    private recipeStatusService: RecipeStatusService
  ) {}

  ngOnInit(): void {

 
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
  

    console.log('fermentationlog date ' + this.form.controls['FermentationLogs.date'])
    this.service.update(this.recipe.id, this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
     
          console.log(this.route);
          this.router.navigate(['/recipes']);
        
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

  calculateCompletionDate(): Date {

    let completionDate = new Date(this.r.date);
    completionDate.setDate(completionDate.getDate() + (this.r.estimatedDuration))
  // console.log('month ' + this.r.date.getMonth);

    return completionDate
 
  } 

  calculateOriginalGravity(): number  {
       return this.f.targetEff.value * 2;
    
      
  }

  // The overall color is determined by the color and quantity
  // of each grain in the recipe
  calculateColor(): number  {
   
   // first sum the color and quantity of each grain
    const rgs: RecipeGrain[] = [];
    this.f.recipeGrains.value.forEach((val: RecipeGrain) => rgs.push(Object.assign({}, val)));
   
    let totalColor: number = 0;
    rgs.forEach( (element) => {
      console.log('elem Quantity ' + element.quantity);
      let grainColor = element.quantity * element.color;
      totalColor += grainColor;
    });

   console.log('totalColor after summing grains ' + totalColor);  

   // next adjust the color based on the quantity being brewed
   totalColor = totalColor / (this.f.batchYield.value * 31);
   console.log('totalColor after yield adjustment ' + totalColor);  

   // and a couple of adjustments to finalze the color
   totalColor = totalColor * 1.4922;
   console.log('totalColor after x1.4922 adjustment ' + totalColor);  

   totalColor = totalColor ** 0.6859;
   console.log('totalColor after exponential adjustment ' + totalColor);  
 
   return totalColor;  
  }

  statusChange(name: string) {
    this.f.status.setValue(name);  
  }
}
function Output() {
  throw new Error('Function not implemented.');
}




