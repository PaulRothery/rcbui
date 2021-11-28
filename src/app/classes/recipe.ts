import { RecipeHopComponent } from "../components/recipes/recipe-hop/recipe-hop.component";
import { RecipeBrewer } from "./recipe-brewer";
import { RecipeGrain } from "./recipe-grain";
import { RecipeHop } from "./recipe-hop";

export class Recipe {
  id!: string;
  name!: string;
  status!: string;
  batchId!: string;
  previousBatchId!: string;
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
  recipeBrewers!: RecipeBrewer[];
 
}