import { Component, Input, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FermentationLog } from 'src/app/classes/fermentationlog';
import { BrewerService } from 'src/app/services/brewer.service';

@Component({
  selector: 'fermentationlog',
  templateUrl: './fermentationlog.component.html',
  styleUrls: ['./fermentationlog.component.css']
})



export class FermentationlogComponent implements OnInit {

  brewers?: any[];

  @Input() fermentationLogs! : FermentationLog[];
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
    console.log('adding fermentationlog for recipe id = ' + this.id);

    if (!this.fermentationLogs) {
      this.fermentationLogs = [];
    }
    let fermentationLog = new FermentationLog;
    fermentationLog.recipeId = this.id;
    this.fermentationLogs.push(fermentationLog);
  }

  removeRow(fermentationLog: FermentationLog) {
    let index: any = this.fermentationLogs?.indexOf(fermentationLog);
    this.fermentationLogs?.splice(index, 1);
  } 

  brewerIsEmpty(brewer: string): boolean {

    if (brewer) return false;
    return true;
  } 

  nameChange(brewer: string) {
    console.log('fermentationlog brewer change ' + brewer)
    this.fermentationLogs[this.fermentationLogs.length - 1].brewer = brewer;  
  } 

  // if there are no records to display add an empty row
  // so that one can be added
  checkElements() {

    console.log('fermentation log check elements ' + this.fermentationLogs?.length )
  if (this.fermentationLogs.length === 0) {
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
   
    this.fermentationLogs[index].date = this.newDate;

    return date;
  }
 }