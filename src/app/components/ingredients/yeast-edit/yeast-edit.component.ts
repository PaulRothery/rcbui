import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Yeast } from 'src/app/classes/yeast';

import { YeastService } from '../../../services/yeast.service';

@Component({
  selector: 'yeast-edit',
  templateUrl: './yeast-edit.component.html',
  styleUrls: ['./yeast-edit.component.css']
})
export class YeastEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  yeast!: Yeast;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: YeastService
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      strain: ['', Validators.required],
      date: [''],
      supplier: ['', Validators.required],
      maltster: ['', Validators.required],
      lotNumber: ['', Validators.required],
      brand: ['', Validators.required],
      previousBatchId: ['', Validators.pattern(numberPattern)],
      previousBatchBrand: [''],
      generation: ['', [Validators.required,Validators.pattern(numberPattern)]],
      cellCount : ['', [Validators.required,Validators.pattern(numberPattern)]],
      viability: ['', [Validators.required,Validators.pattern(numberPattern)]],
      initialQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
      currentQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
     });

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe( 
            data => {
              this.yeast = new Yeast;
              this.yeast = data[0];
              this.yeast.id = this.id;
              this.form.patchValue(this.yeast)
            },
            error => console.log('err ' + error),
          );

    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('form ' + JSON.stringify(this.form.value, null, 2));
 
    this.loading = true;
    if (this.isAddMode) {
        this.createYeast();
    } else {
        this.updateYeast();
    }
   
  }
  
  updateYeast() {
  
    console.log('update ' + this.yeast.initialQuantity);
    this.service.update(this.yeast.id, this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
     
          console.log(this.route);
          this.router.navigate(['/yeasts']);
        
        },
        error: error => {
            console.log(error);
            this.loading = false;
        }
    });

  }

  createYeast() {

    console.log('yeast create : ' + this.form.value.viability);
    console.log('yeast create : ' + this.form.value.currentQuantity);
    this.service.create(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {

   
            this.router.navigate(['/yeasts']);
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
