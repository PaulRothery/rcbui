import { RecipeHopComponent } from "../components/recipes/recipe-hop/recipe-hop.component";
import { RecipeGrain } from "./recipe-grain";
import { RecipeHop } from "./recipe-hop";

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
  recipeHops!: RecipeHop[];
 
}