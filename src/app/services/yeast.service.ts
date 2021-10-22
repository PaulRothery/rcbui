import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data-service';


@Injectable({
  providedIn: 'root',
})
export class YeastService extends DataService {


  // add yeast url and delegate all methods to super class
  constructor(httpClient: HttpClient) {
    super('http://localhost:8080/yeast', httpClient);
  }

 
}
