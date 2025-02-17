import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MemberCategoryParams } from '../models/membertcategorymodels/member-category-params.models';
import { MemberCategoryResult } from '../models/membertcategorymodels/member-category-results.models';
import { EditMemberCategory, Root } from '../models/membertcategorymodels/member-category-edit.models';
import { AddCategory } from '../models/membertcategorymodels/member-category-add.models';
@Injectable({
  providedIn: 'root'
})
export class MemberCategoryService {
  private apiurl = environment.apiurl3
  private apiurl2 = environment.apiurl3getall

  constructor(private http: HttpClient) { }
  getMemberCategories(params: MemberCategoryParams): Observable<MemberCategoryResult> {
    return this.http.post<MemberCategoryResult>(this.apiurl2, params);
  }
  getMemberCategoryById(typeId: number): Observable<Root> {
    return this.http.get<Root>(`${this.apiurl}/get-by-id/${typeId}`);
  }
  addMemberCategory(data: AddCategory): Observable<AddCategory> {
          console.log('addSportsActivity() called'); // ✅ Step 1: Confirm function is called
          console.log('Sending API request to:', `${this.apiurl}/add`);
          console.log('Request Data:', data); // ✅ Step 2: Print the data before sending
        
          return this.http.post<AddCategory>(`${this.apiurl}/add`, data);
        }
    editMemberCategory(member: EditMemberCategory): Observable<any> {
          return this.http.put<any>(`${this.apiurl}/edit-Categry`, member);
      }
      
      
        
        deleteMemberCategory(typeId: number): Observable<any>{
          return this.http.delete(`${this.apiurl}/delete/${typeId}`);
        }
}
