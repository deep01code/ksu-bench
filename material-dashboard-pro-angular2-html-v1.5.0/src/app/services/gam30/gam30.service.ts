import { Injectable } from '@angular/core';
import { ListRelease } from '../../classes/gam29/list-release';
import { NameCount } from '../../classes/gam6/name-count';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam30Service {
    public SERVER_URL: string = environment.serverUrl;
    private GetReleaseIDUrl = this.SERVER_URL+'/alm/defect/releases';
    private GetReOpenTickedByDevUrl = this.SERVER_URL+'/alm/defect/reopenedDefectsPerDeveloperInRelease?id=';

  constructor(private http: HttpClient) { }

    getReleaseIDs(): Observable<ListRelease[]>{
        return this.http.get<ListRelease[]>(this.GetReleaseIDUrl);
    }
    
    getReOpenTicket(id): Observable<NameCount[]>{
        return this.http.get<NameCount[]>(this.GetReOpenTickedByDevUrl+id);
    }


}
