import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Grain } from 'src/app/classes/grain';
import { GrainService } from 'src/app/services/grain.service';

@Component({
  selector: 'grain-edit',
  templateUrl: './grain-edit.component.html',
  styleUrls: ['./grain-edit.component.css']
})
export class GrainEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;
  grain!: Grain;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: GrainService
  ) {}

  ngOnInit(): void {


    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    let numberPattern = /\-?\d*\.?\d{1,2}/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      supplier: ['', Validators.required],
      category: ['', Validators.required],
      sackWeight: ['', Validators.required],
      moistureContent: ['', Validators.required],
      fgdb: ['', Validators.required],
      proteinContent: ['', Validators.required],
      color: ['', Validators.required],
      diastaticPower: ['', Validators.required],
      basePrice: ['', [Validators.required, Validators.pattern(numberPattern)]],
      millingPrice: ['',[Validators.required, Validators.pattern(numberPattern)]],
      shippingPrice: ['', [Validators.required, Validators.pattern(numberPattern)]],
      initialQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
      currentQuantity: ['', [Validators.required, Validators.pattern(numberPattern)]],
    });

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe( 
            data => {
              this.grain = new Grain;
              this.grain = data[0];
              this.grain.id = this.id;
              this.form.patchValue(this.grain)
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
        this.createGrain();
    } else {
        this.updateGrain();
    }
   
  }
  
  updateGrain() {
  
    console.log('update ' + this.form.value);
    this.service.update(this.grain.id, this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
     
          console.log(this.route);
          this.router.navigate(['/grains']);
        
        },
        error: error => {
            console.log(error);
            this.loading = false;
        }
    });

  }

  createGrain() {

    this.service.create(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {

   
            this.router.navigate(['/grains']);
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

