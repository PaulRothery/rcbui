import { RecipeGrain } from "./recipe-grain";

export class Recipe {
  id!: string;
  name!: string;
  status!: string;
  batchNo!: string;
  previousBatchNo!: string;
  date!: Date;
  type!: string;
  batchYield!: number;
  targetOG!: number;
  targetEff!: number;
  targetIbus!: number;
  targetColor!: number;
  yeastVessel!: string;
  fermentorVessel!: string;
  pitchVolume!: number;
  description!: string;
  recipeGrains!: RecipeGrain[];
 
}