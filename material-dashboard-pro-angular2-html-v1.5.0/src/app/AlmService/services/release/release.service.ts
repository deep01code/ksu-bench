import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Release} from '../../classes/release';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ReleaseService {
    public SERVER_URL: string = environment.serverUrl;
    private BaseURI = this.SERVER_URL+'/almservice/';
    constructor(private http: HttpClient) { }

    getReleases(type: string): Observable<Release[]>{
        return this.http.get<Release[]>(this.BaseURI+type+'/releases');
    }

}
