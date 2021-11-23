import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Recipe } from 'src/app/classes/recipe';
import { RecipeGrain } from 'src/app/classes/recipe-grain';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  recipe!: Recipe;

  rtmp!: string;


  public isShowGrain:boolean = false;

  public isShowHop:boolean = false;

 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService
  ) {}

  ngOnInit(): void {

    this.rtmp = 'testit';

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      status: ['', Validators.required],
      batchNo: ['', Validators.required],
      previousBatchNo: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      batchYield: ['', [Validators.pattern(numberPattern)]],
      targetOG: ['',[Validators.pattern(numberPattern)]],
      targetEff: ['', [Validators.pattern(numberPattern)]],
      targetIbus: ['', [Validators.pattern(numberPattern)]],
      targetColor: ['', [Validators.pattern(numberPattern)]],
      yeastVessel: [''],
      fermentorVessel: [''],
      pitchVolume: ['', [Validators.pattern(numberPattern)]],
      description: [''],
      recipeGrains: [''],
      recipeHops: [''],
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
  
    console.log('update ' + this.form.value);
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
}
function Output() {
  throw new Error('Function not implemented.');
}

