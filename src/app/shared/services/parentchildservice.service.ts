import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SearchParentchildmember } from '../models/ParentChildmodels/parentchildsearch';

@Injectable({
  providedIn: 'root'
})
export class ParentchildserviceService {
  apiUrl = environment.apiparentchildmembersearch;
  constructor(private httpclient:HttpClient) { }

  searchMembers(memberId?: string,nameAr?: string): Observable<SearchParentchildmember[]> {
    let params = new HttpParams();
    if (memberId) params = params.set('memberId', memberId);
    if (nameAr) params = params.set('nameAr', nameAr);

    return this.httpclient.get<SearchParentchildmember[]>(`${this.apiUrl}`, { params });
  }
}
