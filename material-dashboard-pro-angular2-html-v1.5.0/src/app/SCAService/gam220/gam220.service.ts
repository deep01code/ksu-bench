import { Injectable } from '@angular/core';
import { ScenarioArea } from './classes/scenarioarea';
import { ScenarioAreaRequest } from './classes/scenarioarearequest';
import { ScenarioGivenArea } from './classes/scenarioGivenArea';
import { ScenarioGivenAreaRequest } from './classes/ScenarioGivenAreaRequest';
import {Observable} from 'rxjs/Observable';
import {HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam220Service {
    //private baseUrl = this.SERVER_URL+'/scaservice/';
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/scaservice/database/get';

    constructor(private http: HttpClient) {

    }

    getScenarioArea(body: ScenarioAreaRequest): Observable<ScenarioArea> {
        return this.http.post<ScenarioArea>(this.baseUrl, body);
    }

    getScenarioForGivenArea(body: ScenarioGivenAreaRequest): Observable<ScenarioGivenArea> {
        return this.http.post<ScenarioGivenArea>(this.baseUrl, body);
    }
}
