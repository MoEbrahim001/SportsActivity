import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddCity } from '../models/Citymodels/city-add.models';
import { EditCity } from '../models/Citymodels/city-edit.models';
import { CityList } from '../models/Citymodels/city-list.models';
import { CityParams } from '../models/Citymodels/city-params.models';
import { CityResult } from '../models/Citymodels/city-results.models';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpclient :HttpClient) { }
  
}
