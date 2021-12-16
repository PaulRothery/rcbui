import { RecipeHopComponent } from "../components/recipes/recipe-hop/recipe-hop.component";
import { BrewDay } from "./brewday";
import { RecipeBrewer } from "./recipe-brewer";
import { BrewLog } from "./brewlog";
import { RecipeGrain } from "./recipe-grain";
import { RecipeHop } from "./recipe-hop";
import { RecipeSalt } from "./recipe-salt";

export class Recipe {
  id!: string;
  name!: string;
  status!: string;
  batchId!: string;
  subBatchId!: number;
  previousBatchId!: string;
  date!: Date;
  estimatedDuration!: number;
  type!: string;
  batchYield!: number;
  targetEff!: number;
  recipeGrains!: RecipeGrain[];
  recipeHops!: RecipeHop[];
  recipeSalts!: RecipeSalt[];
  recipeBrewers!: RecipeBrewer[];
  brewDays!: BrewDay[];
  brewLogs!: BrewLog[];
 
}