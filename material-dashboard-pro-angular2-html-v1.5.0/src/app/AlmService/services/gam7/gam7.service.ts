import { Injectable } from '@angular/core';
import {ListRelease} from '../../classes/gam29/list-release';
import {Observable} from 'rxjs/Observable';
import {NameCount} from '../../classes/name-count';
import {NameBugStatus} from '../../classes/gam7/name-bug-status';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam7Service {
  public SERVER_URL: string = environment.serverUrl;
  private url=this.SERVER_URL+'/almservice/defect/releases';
  private url2=this.SERVER_URL+'/almservice/defect/testerDefectsPerRelease?id=';

  private cRsPerTesterInRelease = this.SERVER_URL+'/almservice/defect/testerDefectStatusesInReleasePerCR?';
      //this.SERVER_URL+'/almservice/defect/testerRejectedDefectsPerRelease?id=';
  constructor(private http:HttpClient) { }

  getReleases(): Observable<ListRelease[]>{
    return this.http.get<ListRelease[]>(this.url);
  }

  getTesterDefects(id):Observable<NameBugStatus[]>{
      return this.http.get<NameBugStatus[]>(this.url2+id);
  }

  getTesterDefectsStatusesInReleasePerCR(releaseId:number,testerName:string):Observable<NameBugStatus[]>{
      return this.http.get<NameBugStatus[]>(
          this.cRsPerTesterInRelease+'releaseId='+releaseId+'&testerName='+testerName);
  }

}
