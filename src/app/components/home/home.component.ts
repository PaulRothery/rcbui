import { Component, OnInit } from '@angular/core';
import { BrewerService } from 'src/app/services/brewer.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  brewers?: any[];
  public isShowBrewer:boolean = false;
 
  
  constructor(
    private brewerService: BrewerService
 
  ) { }

  ngOnInit(): void {
    this.brewerService.getAll().subscribe((brewers) => (this.brewers = brewers));

  }

  onSave() {
    console.log("Button clicked");
  }

}
