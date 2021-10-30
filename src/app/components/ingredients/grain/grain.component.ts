import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { GrainService } from 'src/app/services/grain.service';

@Component({
  selector: 'grain',
  templateUrl: './grain.component.html',
  styleUrls: ['./grain.component.css'],
})
export class GrainComponent implements OnInit {
  grains?: any[];

  isRouted: boolean = false;

  constructor(private service: GrainService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((grains) => (this.grains = grains));
    console.log(this.router.url);
    this.isRouted = true;
  }

  createGrain(input: HTMLInputElement) {
    let grain: any = { title: input.value };
    this.grains?.splice(0, 0, grain);

    input.value = '';

    this.service.create(grain).subscribe(
      (newGrain) => {
        grain.id = newGrain;
        console.log(grain);
      },
      (error: AppError) => {
        this.grains?.splice(0, 1);

        if (error instanceof BadInput) {
          alert(error.orignalError);
        } else throw error;
      }
    );
  }

  
}
