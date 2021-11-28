import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data-service';


@Injectable({
  providedIn: 'root',
})
export class BrewerService extends DataService {


  // add brewer url and delegate all methods to super class
  constructor(httpClient: HttpClient) {
    super('http://localhost:8080/brewer', httpClient);
  }

 
}
