import { Injectable } from '@angular/core';
import { NameCount } from "../../classes/gam6/name-count";
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { ListRelease } from '../../classes/gam29/list-release'
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam28Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl=this.SERVER_URL+'/alm/defect/';

    constructor(private http:HttpClient) { }

    getDefectsPerDev(id): Observable<NameCount[]>{
        return this.http.get<NameCount[]>(this.baseUrl+"defectsPerDeveloperInRelease?id="+id)
    }

    getReleases(): Observable<ListRelease[]>{
        return this.http.get<ListRelease[]>(this.baseUrl+"releases");
    }
}
