import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddGovernate } from '../models/Governoratemodels/governorate-add.models';
import { EditGovernorate } from '../models/Governoratemodels/governorate-edit.models';
import { GovernorateList } from '../models/Governoratemodels/governorate-list.models';
import { GovernorateResult } from '../models/Governoratemodels/governorate-results.models';
import { GovernorateParams } from '../models/Governoratemodels/governorate-params.models';
import { DistrictResult } from '../models/Districtmodels/district-results.models';
import { DistrictList, Root } from '../models/Districtmodels/district-list.models';
import { AddDistrict } from '../models/Districtmodels/district-add.models';
import { EditDistrict } from '../models/Districtmodels/district-edit.models';
@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private apiurl = environment.apidistrict;
    private apiurl2 = environment.apidistrictgetall;
  constructor(private httpclient:HttpClient) { }


  
   
  
  
    getDistricts(): Observable<DistrictResult> {
      return this.httpclient.get<DistrictResult>(this.apiurl2);
    }
  
    getDistrictsById(typeId: number): Observable<Root> {
      return this.httpclient.get<Root>(`${this.apiurl}/${typeId}`);
    }
  
    addDistricts(data: AddDistrict): Observable<AddDistrict> {
      console.log('addDistricts() called'); // ✅ Step 1: Confirm function is called
      console.log('Sending API request to:', `${this.apiurl}/add`);
      console.log('Request Data:', data); // ✅ Step 2: Print the data before sending
  
      return this.httpclient.post<AddDistrict>(`${this.apiurl}/add`, data);
    }
  
    getDistrictsByCity(cityId: number): Observable<DistrictList[]> {
      return this.httpclient.get<DistrictList[]>(`${this.apiurl}/get-by-city/${cityId}`);
    }
  
    editDistrict(member: EditDistrict): Observable<any> {
      return this.httpclient.put<any>(`${this.apiurl}/edit-district`, member);
    }
  
}
