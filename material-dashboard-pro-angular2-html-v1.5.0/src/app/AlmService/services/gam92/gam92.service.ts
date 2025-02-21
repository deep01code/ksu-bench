import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { PlannedExecs } from '../../classes/gam92/planned-execs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam92Service {
  public SERVER_URL: string = environment.serverUrl;
  private baseUrl = this.SERVER_URL+'/almservice/release/';
  private plannedExecsUrl = 'plannedTCsExec?';
  private actualExecsUrl = 'actualTCsExec?';

  constructor(private http:HttpClient) { }

  getPlannedTCsExecs(id,type):Observable<PlannedExecs[]> {
    return this.http.get<PlannedExecs[]>(this.baseUrl+this.plannedExecsUrl+"id="+id+"&type="+type);
  }

  getActualTCsExecs(id,type):Observable<PlannedExecs[]> {
    return this.http.get<PlannedExecs[]>(this.baseUrl+this.actualExecsUrl+"id="+id+"&type="+type);
  }

  getFunctionalPlannedAndActual(id:number):Observable<Array<Array<any>>> {
      return this.http.get<Array<Array<any>>>(this.baseUrl+'func?id='+id);
  }

    getRegressionPlannedAndActual(id:number):Observable<Array<Array<any>>> {
        return this.http.get<Array<Array<any>>>(this.baseUrl+'reg?id='+id);
    }
}
