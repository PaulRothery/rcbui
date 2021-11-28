import { CurrencyPipe, PercentPipe } from '@angular/common';
import { templateJitUrl } from '@angular/compiler';
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
import { Hop } from 'src/app/classes/hop';
import { HopService } from 'src/app/services/hop.service';


@Component({
  selector: 'hop-edit',
  templateUrl: './hop-edit.component.html',
  styleUrls: ['./hop-edit.component.css'],
})

export class HopEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  hop!: Hop;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: HopService
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      date: [''],
      supplier: ['', Validators.required],
      lotNumber: ['', Validators.required],
      cropYear: ['', [ Validators.required, Validators.pattern('^[0-9]{4}$')]],
      price: ['', Validators.required],
      alpha: ['', Validators.required],
      initialQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
      currentQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
     });

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe( 
            data => {
              this.hop = new Hop;
              this.hop = data[0];
              this.hop.id = this.id;
              this.form.patchValue(this.hop)
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
        this.createHop();
    } else {
        this.updateHop();
    }
   
  }
  
  updateHop() {
  
    console.log('update ' + this.form.value);
    this.service.update(this.hop.id, this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
     
          console.log(this.route);
          this.router.navigate(['/hops']);
        
        },
        error: error => {
            console.log(error);
            this.loading = false;
        }
    });

  }

  createHop() {

    this.service.create(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {

   
            this.router.navigate(['/hops']);
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
