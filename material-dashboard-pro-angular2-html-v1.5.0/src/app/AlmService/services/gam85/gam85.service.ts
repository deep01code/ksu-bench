import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { Defect } from '../../classes/gam85/defect';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam85Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/almservice/';

    private controller = 'sla/';

    private developerSLA = 'getDeveloperSLA?id=';

    private testerSLA = 'getTesterSLA?id=';
    
  constructor(private http: HttpClient) { }


  getDeveloperSLAs(id:number):Observable<Defect[]> {
      return this.http.get<Defect[]>(this.baseUrl+this.controller+this.developerSLA+id);
  }
    
  getTesterSLAs(id:number):Observable<Defect[]> {
      return this.http.get<Defect[]>(this.baseUrl+this.controller+this.testerSLA+id);
  }

}
