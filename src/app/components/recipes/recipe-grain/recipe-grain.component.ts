import { Component, Input, OnInit } from '@angular/core';
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
  

  @Input() recipeGrains! : RecipeGrain[];
  @Input() tmp!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService
  ) {}

  ngOnInit(): void {


    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
    });


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