import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from '../../../common/app-error';
import { BadInput } from '../../../common/bad-input';
import { NotFoundError } from '../../../common/not-found-error';
import { HopService } from '../../../services/hop.service';

@Component({
  selector: 'hop',
  templateUrl: './hop.component.html',
  styleUrls: ['./hop.component.css'],
})
export class HopComponent implements OnInit {
  hops?: any[];

  constructor(private service: HopService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((hops) => (this.hops = hops));
  }

  createHop(input: HTMLInputElement) {
    let hop: any = { title: input.value };
    this.hops?.splice(0, 0, hop);

    input.value = '';

    this.service.create(hop).subscribe(
      (newHop) => {
        hop.id = newHop;
        console.log(hop);
      },
      (error: AppError) => {
        this.hops?.splice(0, 1);

        if (error instanceof BadInput) {
          alert(error.orignalError);
        } else throw error;
      }
    );
  }


  deleteHop(hop: { id: any }) {
    let index: any = this.hops?.indexOf(hop);
    this.hops?.splice(index, 1);

    this.service.delete(hop.id).subscribe(null, (error: AppError) => {
      this.hops?.splice(index, 0, hop);

      if (error instanceof NotFoundError)
        alert('This hop has already been deleted');
      else throw error;
    });
  }
}
