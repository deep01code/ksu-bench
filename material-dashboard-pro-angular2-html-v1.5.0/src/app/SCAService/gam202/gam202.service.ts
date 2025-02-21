import { Injectable } from '@angular/core';
import { Scenario } from './classes/scenario';
import { ScRequest } from '../commonClasses/sc-request';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam202Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/scaservice/';
    private dbEndPoint = 'database/get';
    private scenarioListUrl = '';


    constructor(private http: HttpClient) {
    }


    getScenarioList(entry: ScRequest): Observable<Scenario> {
        return this.http.post<Scenario>(this.baseUrl + this.dbEndPoint, entry);
    }

}
