import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam704Service {
    public SERVER_URL: string = environment.serverUrl;
    // private reportGenerationURL = 'http://localhost:7289';
    // private attendanceReportURL = 'http://localhost:7287';
    private attendanceReportURL = this.SERVER_URL+'/attendnaceprojectmanagementservice'
    private reportGenerationURL = this.SERVER_URL+'/reportgenerationservice';
    private projectsUrl = this.attendanceReportURL + '/projects/projects';
    private reportUrl = this.reportGenerationURL + '/report';
    private generateWfUrl = this.reportGenerationURL + '/generateworkflow';
    //TODO change Urls from local !!!
    private programsUrl = this.attendanceReportURL + '/programs';
    private newReportUrl = this.reportGenerationURL + '/no-generation-report';
    private newGenerateWfUrl = this.reportGenerationURL + '/generate-report';
    private downloadWfUrl = this.SERVER_URL+'/workflowservice/downloadTemp'
    constructor(private http: HttpClient) { }

    getProjects(): Observable<any> {
        return this.http.get<any>(this.programsUrl);
    }

    getPrograms(): Observable<any[]> {
        return this.http.get<any[]>(this.programsUrl);
    }

    getSummary(summary: any): Observable<any> {
        return this.http.post(this.newReportUrl, summary);
    }

    generateWorkFlow(obj: any): Observable<any> {
        return this.http.post(this.newGenerateWfUrl, obj);
    }

    downloadWorkFlow(obj: any): Observable<any> {
        return this.http.post(this.downloadWfUrl, obj);

    }

}
