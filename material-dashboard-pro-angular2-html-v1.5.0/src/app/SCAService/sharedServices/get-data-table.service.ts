import { Injectable } from '@angular/core';
import {ScRequest} from '../commonClasses/sc-request';
import {HttpClient} from '@angular/common/http';
import {Scenario} from '../gam202/classes/scenario';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
@Injectable()
export class GetDataTableService {

    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/scaservice/';
    private dbEndPoint = 'database/get';
    private scenarioListUrl = '';


    constructor(private http: HttpClient) {
    }


    getScenarioList(entry: ScRequest): Observable<any> {
        return this.http.post<Scenario>(this.baseUrl + this.dbEndPoint, entry);
    }

}
