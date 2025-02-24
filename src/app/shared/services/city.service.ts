import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddCity } from '../models/Citymodels/city-add.models';
import { EditCity } from '../models/Citymodels/city-edit.models';
import { CityList, Root } from '../models/Citymodels/city-list.models';
import { CityParams } from '../models/Citymodels/city-params.models';
import { CityResult } from '../models/Citymodels/city-results.models';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiurl = environment.apicity;
private apiurl2 = environment.apicitygetall;
  constructor(private httpclient :HttpClient) { }
   getCities(): Observable<CityResult> {
      return this.httpclient.get<CityResult>(this.apiurl2);
  }
  
      getCitiessById(typeId: number): Observable<Root> {
        return this.httpclient.get<Root>(`${this.apiurl}/${typeId}`);
      }
        addCities(data: AddCity): Observable<AddCity> {
                console.log('addSportsActivity() called'); // ✅ Step 1: Confirm function is called
                console.log('Sending API request to:', `${this.apiurl}/add`);
                console.log('Request Data:', data); // ✅ Step 2: Print the data before sending
              
                return this.httpclient.post<AddCity>(`${this.apiurl}/add`, data);
              }
              getCitiesByGovernorate(governorateId: number): Observable<CityList[]> {
                return this.httpclient.get<CityList[]>(`${this.apiurl}/get-by-governorate/${governorateId}`);
              }
              
      editCity(member: EditCity): Observable<any> {
                return this.httpclient.put<any>(`${this.apiurl}/edit-governate`, member);
            }
            deleteCity(typeId: number): Observable<any>{
              return this.httpclient.delete(`${this.apiurl}/delete/${typeId}`);
            
            
            }
  
}
