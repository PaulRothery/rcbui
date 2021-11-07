import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Adjunct } from 'src/app/classes/adjunct';
import { AdjunctService } from 'src/app/services/adjunct.service';

@Component({
  selector: 'adjunct-edit',
  templateUrl: './adjunct-edit.component.html',
  styleUrls: ['./adjunct-edit.component.css']
})
export class AdjunctEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  adjunct!: Adjunct;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AdjunctService
  ) {}

  ngOnInit(): void {


    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      supplier: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      extract: ['', [Validators.required, Validators.pattern(numberPattern)]],
      ppg: ['',[Validators.required, Validators.pattern(numberPattern)]],
      colorLov: ['', [Validators.required, Validators.pattern(numberPattern)]],
      price: ['', [Validators.required, Validators.pattern(numberPattern)]],
      initialQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
      currentQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
   });

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe( 
            data => {
              this.adjunct = new Adjunct;
              this.adjunct = data[0];
              this.adjunct.id = this.id;
              this.form.patchValue(this.adjunct)
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
  
    console.log(JSON.stringify(this.form.value, null, 2));
 
    this.loading = true;
    if (this.isAddMode) {
        this.createAdjunct();
    } else {
        this.updateAdjunct();
    }
   
  }
  
  updateAdjunct() {
  
    console.log('update ' + this.form.value);
    this.service.update(this.adjunct.id, this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
     
          console.log(this.route);
          this.router.navigate(['/adjuncts']);
        
        },
        error: error => {
            console.log(error);
            this.loading = false;
        }
    });

  }

  createAdjunct() {

    this.service.create(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {

   
            this.router.navigate(['/adjuncts']);
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
