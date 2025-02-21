import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Gam86} from '../../classes/gam86/gam86';
import {Priority} from '../../classes/gam86/priority';
import {Severity} from '../../classes/gam86/severity';
import {HttpClient} from '@angular/common/http';
import {LabRelease} from '../../classes/gam6/lab-release';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam86Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl= this.SERVER_URL+'/almservice/defect/';

    private statisticsOfDefect = "statisticsOfDefect?id=";
    private statisticsOfPriorityDefect = "statisticsOfPriorityDefect?id=";
    private statisticsOfSeverityDefect = "statisticsOfSeverityDefect?id=";
    
    constructor(private http:HttpClient) { }

    getDefectStatistics(id): Observable<Gam86[]>{
        return this.http.get<Gam86[]>(this.baseUrl + this.statisticsOfDefect + id);
    }
    
    getPriorityDefectStatistics(id): Observable<Priority[]>{
        return this.http.get<Priority[]>(this.baseUrl + this.statisticsOfPriorityDefect + id);
    }
    
    getSeverityDefectStatistics(id): Observable<Severity[]>{
        return this.http.get<Severity[]>(this.baseUrl + this.statisticsOfSeverityDefect + id);
    }
    

}
