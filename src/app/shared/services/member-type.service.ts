import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MemberTypeParams } from '../models/membertypemodels/mwmber-type-params';
import { MemberTypeResult } from '../models/membertypemodels/member-type-results';
import { EditMemberType,  Root } from '../models/membertypemodels/member-type-edit.model';
import { AddMember } from '../models/membertypemodels/member-type-add.model';

@Injectable({
  providedIn: 'root',
})
export class MemberTypesService {
    private apiUrl = environment.apiurl2 ;
    private apiUrl2 = environment.apiurlgettype ;
    constructor(private http: HttpClient) {}
    getMemberTypes(params: MemberTypeParams): Observable<MemberTypeResult> {
        return this.http.post<MemberTypeResult>(this.apiUrl2, params);
      }
      getMemberTypeById(typeId: number): Observable<Root> {
        return this.http.get<Root>(`${this.apiUrl}/get-by-id/${typeId}`);
    }
    addMemberType(data: AddMember): Observable<AddMember> {
        console.log('addSportsActivity() called'); // ✅ Step 1: Confirm function is called
        console.log('Sending API request to:', `${this.apiUrl}/add`);
        console.log('Request Data:', data); // ✅ Step 2: Print the data before sending
      
        return this.http.post<AddMember>(`${this.apiUrl}/add`, data);
      }


      editMemberType(member: EditMemberType): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/edit-Type`, member);
    }
    
    
      
      deleteSportsActivity(typeId: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/delete/${typeId}`);
      }
    

}
