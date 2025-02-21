import { Injectable } from '@angular/core';
import { Branchrequest } from './classes/branchrequest';
import { Branchrespoend } from './classes/branchrespoend';
import {Observable} from 'rxjs/Observable';
import {HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam258Service {
    public SERVER_URL: string = environment.serverUrl;
private baseUrl = this.SERVER_URL+'/scaservice/database/get';

constructor(private http: HttpClient) {
    }

    getBranch(entry: Branchrequest): Observable<Branchrespoend> {
        return this.http.post<Branchrespoend>(this.baseUrl, entry);
    }
}
