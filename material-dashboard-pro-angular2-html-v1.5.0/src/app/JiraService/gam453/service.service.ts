import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable()
export class ServiceService {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/stcjiraservice/bu';
    private updateRadianceUrl = 'http://10.33.116.39:9915/updateRadiance';


    constructor(private http: HttpClient) { }

    getCRs():Observable<any[]>{
        return this.http.get<any[]>(this.baseUrl);
    }

    updateRadiance():Observable<any[]>{
        return this.http.get<any[]>(this.updateRadianceUrl);
    }
}
