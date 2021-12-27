import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class BrewLog {
  id!: string;
  recipeId!: string;
  date!: Date;
  time!: Date;
  temp!: number;
  gravity!: number;
  ph!: number;
  brewer!: string;
  note!: string;

}