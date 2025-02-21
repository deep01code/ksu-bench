import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import {environment} from '../../../environments/environment';

@Injectable()
export class ExceptionService {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/employeeservice/';
    private addExceptionsEndpoint = this.SERVER_URL+'/employeeservice/exception';

    // private baseUrl = 'http://localhost:7297/';
    // private addExceptionsEndpoint = 'http://localhost:7297/exception';
    private exceptionsEndpoint = this.baseUrl + 'exceptions/lookups/';
    constructor(private http: HttpClient) { }

    public getExceptions(): Observable<any> {

        return this.http.get<any>(this.exceptionsEndpoint);
    }

    public getListOfEmployees(program, department) {
        return this.http.get<any>(this.baseUrl + program + "/employees?department=" + department);
    }

    public applyException(obj) {
        obj.endDate = moment(moment(obj.endDate)).format('YYYY-MM-DD');
        obj.startDate = moment(moment(obj.startDate)).format('YYYY-MM-DD');

        return this.http.post<any[]>(this.addExceptionsEndpoint, obj);
    }

    public removeException(exception){
        return this.http.delete<any>(this.addExceptionsEndpoint+"?id="+exception);
      }
}
