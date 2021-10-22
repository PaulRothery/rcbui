import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-found-error';
import { AdjunctService } from 'src/app/services/adjunct.service';

@Component({
  selector: 'adjunct',
  templateUrl: './adjunct.component.html',
  styleUrls: ['./adjunct.component.css']
})
export class AdjunctComponent implements OnInit {

  adjuncts?: any[];

  constructor(private service: AdjunctService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((adjuncts) => (this.adjuncts = adjuncts));
  }

  createAdjunct(input: HTMLInputElement) {
    let adjunct: any = { title: input.value };
    this.adjuncts?.splice(0, 0, adjunct);

    input.value = '';

    this.service.create(adjunct).subscribe(
      (newAdjunct) => {
        adjunct.id = newAdjunct;
        console.log(adjunct);
      },
      (error: AppError) => {
        this.adjuncts?.splice(0, 1);

        if (error instanceof BadInput) {
          alert(error.orignalError);
        } else throw error;
      }
    );
  }

}
