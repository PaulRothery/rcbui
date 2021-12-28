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


  constructor(
    private brewerService: BrewerService
    ) {}

  ngOnInit(): void {
    this.brewerService.getAll().subscribe((brewers) => (this.brewers = brewers));
    

  }

  addRow() {
    console.log('adding brewlog for recipe id = ' + this.id);
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
    console.log('brewlog brewer change ' + brewer)
    this.brewLogs[this.brewLogs.length - 1].brewer = brewer;  
  } 

  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

  if (this.brewLogs?.length === 0) {
     this.addRow();
   } 
   
  }

updateSelectedDate(date: NgbDate, index: number): NgbDate {

    console.log('selected date = ' + date)
    console.log('occurence = ' + index)
    this.newDate = new Date(
      date.year,
      date.month - 1,
      date.day);
    
      console.log('new date = ' + this.newDate)
   
    this.brewLogs[index].date = this.newDate;

    return date;
  }
 }