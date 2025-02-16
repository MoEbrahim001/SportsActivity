import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { sport, SportActivityList } from '../models/sportactivitiesmodels/sport-activity-list.model';
import { ActivityId } from '../models/sportactivitiesmodels/sport-activity-add.model';
import { SportActivityEdit } from '../models/sportactivitiesmodels/sport-activity-edit.model';
import { SportsActivityParams } from '../models/sportactivitiesmodels/sport-activity-params';
import { SportsActivityResult } from '../models/sportactivitiesmodels/sport-activity-result';

@Injectable({
  providedIn: 'root',
})
export class MemberTypesService {
    private apiUrl = environment.apiurl2 ;
    constructor(private http: HttpClient) {}
    
}
