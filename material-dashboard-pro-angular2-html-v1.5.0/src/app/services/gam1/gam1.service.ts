import { Injectable } from '@angular/core';
import { LabRelease } from '../../classes/gam6/lab-release';
import { CRStatus } from '../../classes/gam1/CRStatus';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam1Service {
  public SERVER_URL: string = environment.serverUrl;
  private GetReleaseNameUrl = this.SERVER_URL+'/alm/release/releases';
  private GetCRsDetailsUrl = this.SERVER_URL+'/alm/release/crsStatuses?id=';
  constructor(private http: HttpClient) { }

  getReleases(): Observable<LabRelease[]>{
    return this.http.get<LabRelease[]>(this.GetReleaseNameUrl);
  }
    
  getCrs(id): Observable<CRStatus[]>{
    return this.http.get<CRStatus[]>(this.GetCRsDetailsUrl+id);
  }  

}
