import { Component, Input, OnInit } from '@angular/core';
import { BrewDay } from 'src/app/classes/brewday';

@Component({
  selector: 'brewday',
  templateUrl: './brewday.component.html',
  styleUrls: ['./brewday.component.css']
})
export class BrewdayComponent implements OnInit {



  @Input() brewDays! : BrewDay[];
  @Input() id!: string;

  constructor() { }

  ngOnInit(): void {
  }



  mashRestTimeTargetChange(newValue: string) {
    console.log(newValue);
   
  }    

  mashInTimeChange(newValue: number) {
  
  }


  // Boil calculations
  calculateBoilKettleVolTarget()  {

      
    return 27;
  
  }

    // Flame Out calculations
    calculateFLameOutKettleVolTarget()  {

      
      return 36;
    }

  // Yeast calculations
  calculatePitchVol()  {

    let pitchVolume = 0;

    pitchVolume = this.brewDays[0].cellCount * 2;
      
    return pitchVolume;
  }
}


