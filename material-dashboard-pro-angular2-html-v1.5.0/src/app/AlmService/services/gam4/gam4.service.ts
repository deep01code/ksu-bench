import { Injectable } from '@angular/core';
import { Gam4 } from '../../classes/gam4/gam4';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { LabRelease } from '../../classes/gam6/lab-release'
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam4Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl= this.SERVER_URL+'/almservice/release/';
// private baseUrl='http://172.20.214.180:9911/';

    constructor(private http:HttpClient) { }

    getExecTestCases(id, type:string): Observable<Gam4>{
        return this.http.get<Gam4>(this.baseUrl + "dayToDayTCsExecutions?id=" + id + "&type=" + type);
    }

    getReleases(): Observable<LabRelease[]>{
        return this.http.get<LabRelease[]>(this.baseUrl + "releases");
    }
}
