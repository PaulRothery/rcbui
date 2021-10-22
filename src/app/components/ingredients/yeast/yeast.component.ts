import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';

import { YeastService } from '../../../services/yeast.service';

@Component({
  selector: 'yeast',
  templateUrl: './yeast.component.html',
  styleUrls: ['./yeast.component.css']
})
export class YeastComponent implements OnInit {

  yeasts?: any[];

  constructor(private service: YeastService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((yeasts) => (this.yeasts = yeasts));
  }

  createYeast(input: HTMLInputElement) {
    let yeast: any = { title: input.value };
    this.yeasts?.splice(0, 0, yeast);

    input.value = '';

    this.service.create(yeast).subscribe(
      (newYeast) => {
        yeast.id = newYeast;
        console.log(yeast);
      },
      (error: AppError) => {
        this.yeasts?.splice(0, 1);

        if (error instanceof BadInput) {
          alert(error.orignalError);
        } else throw error;
      }
    );
  }
}
