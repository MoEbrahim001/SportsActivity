import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { sport, SportActivityList } from '../models/sport-activity-list.model';
import { ActivityId } from '../models/sport-activity-add.model';
import { SportActivityEdit } from '../models/sport-activity-edit.model';
import { SportsActivityParams } from '../models/sport-activity-params';
import { SportsActivityResult } from '../models/sport-activity-result';

@Injectable({
  providedIn: 'root',
})
export class SportsActivityService {
  private apiUrl = environment.apiUrl ;
  private apiUrl2 = environment.apiurlget ;

  constructor(private http: HttpClient) {}

  // getSportsActivities(): Observable<SportActivityList[]> {
  //   return this.http.get<{ data: SportActivityList[] }>(`${environment.apiurlget}`)
  //     .pipe(map(response => response.data)); // ✅ Extract the array
  // }
//   getSportsActivitiess(): Observable<SportActivityList[]> {
//     return this.http.get<SportActivityList[]>(`${environment.apiurlget}`);
// }

// getSportsActivities(): Observable<SportActivityList[]> {
//   return this.http.get<sport>(`${environment.apiurlget}`)
//     .pipe(map(response => response.activities)); // Extract activities array ✅
// }
getSportsActivities(params: SportsActivityParams): Observable<SportsActivityResult> {
  return this.http.post<SportsActivityResult>(this.apiUrl2, params);
}
getSportsActivityById(activityId: number): Observable<SportActivityEdit> {
  return this.http.get<SportActivityEdit>(`${this.apiUrl}/get-by-id/${activityId}`);
}


addSportsActivity(data: ActivityId): Observable<ActivityId> {
  console.log('addSportsActivity() called'); // ✅ Step 1: Confirm function is called
  console.log('Sending API request to:', `${this.apiUrl}/add`);
  console.log('Request Data:', data); // ✅ Step 2: Print the data before sending

  return this.http.post<ActivityId>(`${this.apiUrl}/add`, data);
}

editSportsActivity(activityId: number, formData: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/edit-activity?activityId=${activityId}`, formData);
}

deleteSportsActivity(activityId: number): Observable<any>{
  return this.http.delete(`${this.apiUrl}/delete/${activityId}`);
}

uploadImage(activityId: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.put<any>(`${this.apiUrl}/update-image?activityId=${activityId}`, formData);
}

}
