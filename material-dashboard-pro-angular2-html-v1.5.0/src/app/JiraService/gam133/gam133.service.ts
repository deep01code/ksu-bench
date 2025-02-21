import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Report} from './classes/report';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam133Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/stcjiraservice/';
    
    private listJiraReportUrl1 = 'JiraReport/';
    private listJiraReportUrl = 'report/';

  constructor(private http: HttpClient) { }


    getJiraReport(): Observable<Report[]> {
        return this.http.get<Report[]>(this.baseUrl + this.listJiraReportUrl);
    }

}
