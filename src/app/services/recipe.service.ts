import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data-service';


@Injectable({
  providedIn: 'root',
})
export class RecipeService extends DataService {


  // add recipe url and delegate all methods to super class
  constructor(httpClient: HttpClient) {
    super('http://localhost:8080/recipe', httpClient);
  }

 
}
