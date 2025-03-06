import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchMemberVM } from '../models/Members/SearchMemberVM';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  apiUrl = environment.apimembersearch;
  constructor(private http: HttpClient) { }


  searchMembers(criteria: SearchMemberVM): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, criteria).pipe(
      tap(response => {
        console.log("Raw API Response:", response);
        if (!response || !Array.isArray(response.results)) {
          console.error("Unexpected API response, expected an array:", response);
          response.results = []; // Ensure it's always an array
        }
      }),
      // Extract only the `results` array from the API response
      tap(response => console.log("Extracted Results:", response.results)),
      catchError(error => {
        console.error("API Request Failed:", error);
        return throwError(error);
      }),
      // Transform the API response to return only the `results` array
      map(response => response.results || [])
    );
  }
  
  
  
}
