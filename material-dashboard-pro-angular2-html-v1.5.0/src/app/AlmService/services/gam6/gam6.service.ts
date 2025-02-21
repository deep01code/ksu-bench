import { Injectable } from '@angular/core';
import { NameCount } from '../../classes/name-count';
import { LabRelease } from '../../classes/gam6/lab-release';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam6Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/almservice/release/';
    private labReleasesUrl = 'releases';
    private testerRunsUrl = 'runsPerTesterInRelease?id=';

  constructor(private http: HttpClient) { }

    getRuns(id): Observable<NameCount[]> {
        return this.http.get<NameCount[]>(this.baseUrl + this.testerRunsUrl + id);
    }

    getLabReleases(): Observable<LabRelease[]> {
        return this.http.get<LabRelease[]>(this.baseUrl + this.labReleasesUrl);
    }
}
