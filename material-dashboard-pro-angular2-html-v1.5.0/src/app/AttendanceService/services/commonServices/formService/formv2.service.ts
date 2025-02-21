import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../../environments/environment';
@Injectable()
export class Formv2Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/attendanceservice/';
    private projectsEndPoint = 'projects';
    private modulesEndPoint = 'getModules ';
    private locationsEndPoint = 'getLocations';
    private billingRoleEndPoint ='getBillingRoles';
    private employeesEndPoint = 'getEmployeesInfo';
    private costPerRoleEndPoint = 'getCostOfBillingRole';
    private costPerEmployeeEndPoint = 'getCostOfEmployees';

    constructor(private http: HttpClient) { }

    getProjects(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + this.projectsEndPoint);
    }

    public getModules(requestBody: any): Observable<any[]>{
        return this.http.post<string[]>(this.baseUrl + this.modulesEndPoint, requestBody);
    }

    public getLocations(): Observable<any[]>{
        return this.http.get<string[]>(this.baseUrl + this.locationsEndPoint);
    }

    public getBillingRoles(requestBody: any): Observable<any[]>{
        return this.http.post<string[]>(this.baseUrl + this.billingRoleEndPoint, requestBody);
    }

    getEmployees(requestBody: any): Observable<any[]>{
        return this.http.post<string[]>(this.baseUrl + this.employeesEndPoint, requestBody);
    }

    getCost(requestBody: any): Observable<any[]>{
        let endPoint = requestBody.id?this.costPerEmployeeEndPoint:this.costPerRoleEndPoint
        return this.http.post<string[]>(this.baseUrl+endPoint, requestBody);
    }
}
