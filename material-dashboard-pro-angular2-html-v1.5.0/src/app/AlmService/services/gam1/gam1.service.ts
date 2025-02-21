import { Injectable } from '@angular/core';
import { LabRelease } from '../../classes/gam6/lab-release';
import { CRStatus } from '../../classes/gam1/CRStatus';
import { CRLevelStatus } from '../../classes/gam1/CRLevelStatus';
import { SingleCRStatus } from '../../classes/gam1/singleCRStatus';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FinalCrsStatus } from '../../classes/gam1/finalStatusClasses/FinalCrsStatus'
import {AvailableStatus} from '../../classes/gam1/finalStatusClasses/AvailableStatus';
import {environment} from '../../../../environments/environment';


@Injectable()
export class Gam1Service {

  public SERVER_URL: string = environment.serverUrl;
  private GetReleaseNameUrl = this.SERVER_URL+'/almservice/release/releases';
  private GetCRsDetailsUrl = this.SERVER_URL+'/almservice/release/crsStatuses?id=';
  private GetCRDetailsUrl = this.SERVER_URL+'/almservice/release/crStatuses?id=';
  private GetCRLevelStatus = this.SERVER_URL+'/almcrservice/Status/findByCrName/';
  private PostCRLevelStatus = this.SERVER_URL+'/almcrservice/Status/finalCrStatus';
  private GetAvailableStatus = this.SERVER_URL+'/almcrservice/Status/availableStatus';
  constructor(private http: HttpClient) { }

  getReleases(): Observable<LabRelease[]>{
    return this.http.get<LabRelease[]>(this.GetReleaseNameUrl);
  }
    
  getCrs(id): Observable<CRStatus[]>{
    return this.http.get<CRStatus[]>(this.GetCRsDetailsUrl+id);
  }  

  getSingleCrs(id): Observable<SingleCRStatus[]>{
    return this.http.get<SingleCRStatus[]>(this.GetCRDetailsUrl+id);
  }

  /*
  getCrLevelStatus(crName): Observable<CRLevelStatus[]>{
      return this.http.get<CRLevelStatus[]>(this.GetCRLevelStatus+crName);
  }
  */

  getCrLevelStatus(crId): Observable<FinalCrsStatus>{
      return this.http.get<FinalCrsStatus>(this.GetCRLevelStatus+crId);
  }

  getAvailableStatus(): Observable<AvailableStatus[]>{
      return this.http.get<AvailableStatus[]>(this.GetAvailableStatus);
  }
  postCrLevelStatus(entry: FinalCrsStatus): Observable<FinalCrsStatus> {
      return this.http.put<FinalCrsStatus>(this.PostCRLevelStatus ,entry)
  }
  /*

  postCrLevelStatus(entry: CRLevelStatusPost): Observable<CRLevelStatusPost> {
      return this.http.put<CRLevelStatusPost>(this.PostCRLevelStatus ,entry)
  }
   */
}
