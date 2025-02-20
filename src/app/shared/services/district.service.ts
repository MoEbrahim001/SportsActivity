import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddGovernate } from '../models/Governoratemodels/governorate-add.models';
import { EditGovernorate } from '../models/Governoratemodels/governorate-edit.models';
import { GovernorateList } from '../models/Governoratemodels/governorate-list.models';
import { GovernorateResult } from '../models/Governoratemodels/governorate-results.models';
import { GovernorateParams } from '../models/Governoratemodels/governorate-params.models';
@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private httpclient:HttpClient) { }
}
