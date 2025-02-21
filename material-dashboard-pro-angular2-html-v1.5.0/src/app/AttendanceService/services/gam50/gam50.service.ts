import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
//import {Headers} from 'angular2/http';
import { RoleCost } from '../../classes/gam50/role-cost';
import { RoleAttendance } from '../../classes/gam50/role-attendance';
import { RoleAttendanceEntriesDto } from '../../classes/gam50/role-attendance-entries-dto';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam50Service {


    
    //let headers = new Headers();
    //headers.append('Content-type','application/x-www-form-urlencoded');
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/attendanceservice/';
    private roleCost = 'roleCost';
    private roleParameter = '?role=';
    private rolesCosts = 'rolesCosts';
    private totalAttendanceDaysWithOutWeekEnds = 'totalAttendanceDaysWithOutWeekEnds';

    constructor(private http : HttpClient) { }



    getRoleCost(roleName): Observable<RoleCost> {
        return this.http.get<RoleCost>(this.baseUrl + this.roleCost + this.roleParameter + roleName);
    }

    getRolesCosts(): Observable<RoleCost[]> {
        return this.http.get<RoleCost[]>(this.baseUrl + this.rolesCosts);
    }

    addRoleCost(rCost:RoleCost): Observable<RoleCost> {
        return this.http.post<RoleCost>(this.baseUrl + this.roleCost, rCost);
    }

    getAttendance(entry:RoleAttendanceEntriesDto): Observable<RoleAttendance[]> {
        //console.log(entry + " this is test");
        return this.http.post<RoleAttendance[]>(this.baseUrl + this.totalAttendanceDaysWithOutWeekEnds,
            entry);
    }
}
