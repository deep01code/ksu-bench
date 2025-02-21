import { Injectable } from '@angular/core';
import { Attendance } from '../../classes/gam64/attendance';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam64Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/';
    private serviceName = 'attendanceservice/';
    private serviceSubName = 'countEmployee/';
    private countOfEmpUrl = 'countEmployeeOnSiteOffShore?selectedDate=';

    constructor(private http: HttpClient) { }
    
    getCountOfEmpOnsiteOffshore(selectedDate): Observable<Attendance[]> {
        return this.http.get<Attendance[]>(this.baseUrl + this.serviceName + this.serviceSubName + this.countOfEmpUrl + selectedDate);
    }
}
