import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Recipe } from 'src/app/classes/recipe';
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
  public isShowBrewer:boolean = false;
  public isShowBrewDay:boolean = false;
  public isShowBrewLog:boolean = false;
 
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
      brewLogs: [''],
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
  

    console.log('brewlog date ' + this.form.controls['brewLogs.date'])
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

  calculateOriginalGravity () : number  {
       return this.f.targetEff.value * 2;
    
      
  }

  statusChange(name: string) {

    console.log('salt name change select -> ' + name)
    this.f.status.setValue(name);  
  }
}
function Output() {
  throw new Error('Function not implemented.');
}




