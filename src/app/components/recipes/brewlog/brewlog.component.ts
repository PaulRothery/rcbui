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
    this.newDate = new Date("2015-02-01T12:00:00Z" ); 

    this.enteredDate.year = 2021;
    this.enteredDate.month = 11;
    this.enteredDate.day = 11;

    console.log('enteredDate ' + this.enteredDate);
    

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

  dateChange(index: number, brewLog: BrewLog) {

    console.log('brewlog entered for element ' + index)
    console.log('date ' + brewLog.date)
   
    // if the date has changed then it will be set otherwise just ignore
    if (this.enteredDate) {
        this.newDate = new Date('"' +  this.enteredDate.year + '-' + this.enteredDate.month + '-' + this.enteredDate.day + '"');
      //  this.brewLogs[index].date = this.newDate;
        console.log('brewlog date 0 ' + this.brewLogs[0].date)
        console.log('brewlog date 1 ' + this.brewLogs[1].date)
        console.log('brewlog date 2 ' + this.brewLogs[2].date)
        this.enteredDate.year = 0;
        this.enteredDate.month = 0;
        this.enteredDate.day = 0;
    }
   }

   onDateSelected(){
    console.log(' changing date ')
    
}

  testIt() {

    console.log('testit called')
  }
 }