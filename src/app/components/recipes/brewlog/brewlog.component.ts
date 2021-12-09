import { Component, Input, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BrewLog } from 'src/app/classes/brewlog';
import { BrewerService } from 'src/app/services/brewer.service';

@Component({
  selector: 'brewlog',
  templateUrl: './brewlog.component.html',
  styleUrls: ['./brewlog.component.css']
})



export class BrewlogComponent implements OnInit {

  brewers?: any[];

  @Input() brewLogs! : BrewLog[];
  @Input() id!: string;

  enteredDate!: NgbDate;
  newDate!: Date;

  enteredTime!: Date;

  constructor(
    private brewerService: BrewerService
    ) {}

  ngOnInit(): void {
    console.log('getting brewer logs ' + this.id);
    this.brewerService.getAll().subscribe((brewers) => (this.brewers = brewers));

  }

  addRow() {
    console.log('adding row for recipe id = ' + this.id);
    let brewLog = new BrewLog;
    brewLog.recipeId = this.id;
    this.brewLogs.push(brewLog);
  }

  removeRow(brewLog: BrewLog) {
    let index: any = this.brewLogs?.indexOf(brewLog);
    this.brewLogs?.splice(index, 1);
  } 

  brewerIsEmpty(brewer: string): boolean {

    if (brewer) return false;
    return true;
  } 

  nameChange(brewer: string) {
    this.brewLogs[this.brewLogs.length - 1].brewer = brewer;  
  } 

  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

  if (this.brewLogs?.length === 0) {
     this.addRow();
   } 
   
  }

  // dateChange() {

  //   console.log('brewlog entered date ' + this.enteredDate.year)
  //      // if the date has changed then it will be set otherwise just ignore
  //      if (this.enteredDate) {
  //       this.newDate = new Date('"' +  this.enteredDate.year + '-' + this.enteredDate.month + '-' + this.enteredDate.day + '"');
  //       this.brewLogs[0].date = this.newDate;
  //     }
  // }

  timeChange() {

    console.log('brewlog entered time ' + this.enteredTime)
    this.brewLogs[0].dateTime = this.enteredTime ;
    console.log('size ' + this.brewLogs.length)
    console.log('brewlog updated time ' + this.brewLogs[0].dateTime)
      
  }
  
 }