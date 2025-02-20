import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AddGovernate} from '../models/Governoratemodels/governorate-add.models'
import { EditGovernorate } from '../models/Governoratemodels/governorate-edit.models';
import { GovernorateList, Root } from '../models/Governoratemodels/governorate-list.models';
import { GovernorateParams } from '../models/Governoratemodels/governorate-params.models';
import { GovernorateResult } from '../models/Governoratemodels/governorate-results.models';
@Injectable({
  providedIn: 'root'
})
export class GovernorateService {
private apiurl = environment.apigovernorate;
private apiurl2 = environment.apigovernorategetall;

  constructor(private http: HttpClient) { }

    getGovernorates(params: GovernorateParams): Observable<GovernorateResult> {
      return this.http.post<GovernorateResult>(this.apiurl2, params);
    }
    getGovernoratesById(typeId: number): Observable<Root> {
      return this.http.get<Root>(`${this.apiurl}/${typeId}`);
    }
      addGovernorates(data: AddGovernate): Observable<AddGovernate> {
              console.log('addSportsActivity() called'); // ✅ Step 1: Confirm function is called
              console.log('Sending API request to:', `${this.apiurl}/add`);
              console.log('Request Data:', data); // ✅ Step 2: Print the data before sending
            
              return this.http.post<AddGovernate>(`${this.apiurl}/add`, data);
            }
    editGovernorate(member: EditGovernorate): Observable<any> {
              return this.http.put<any>(`${this.apiurl}/edit-governate`, member);
          }
          deleteGovernorate(typeId: number): Observable<any>{
            return this.http.delete(`${this.apiurl}/delete/${typeId}`);
          
          
          }
}
