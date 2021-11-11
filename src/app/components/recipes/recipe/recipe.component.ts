import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipes?: any[];

  isRouted: boolean = false;

  constructor(private service: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((recipes) => (this.recipes = recipes));
    console.log(this.router.url);
    this.isRouted = true;
  }

  createrecipe(input: HTMLInputElement) {
    let recipe: any = { title: input.value };
    this.recipes?.splice(0, 0, recipe);

    input.value = '';

    this.service.create(recipe).subscribe(
      (newrecipe) => {
        recipe.id = newrecipe;
        console.log(recipe);
      },
      (error: AppError) => {
        this.recipes?.splice(0, 1);

        if (error instanceof BadInput) {
          alert(error.orignalError);
        } else throw error;
      }
    );
  }

  
}
