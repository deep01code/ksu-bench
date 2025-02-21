import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { RoleCost } from '../../../classes/gam50/role-cost';
import { RoleAttendance } from '../../../classes/gam50/role-attendance';
import { RoleAttendanceEntriesDto } from '../../../classes/gam50/role-attendance-entries-dto';
import {environment} from '../../../../../environments/environment';
@Injectable()
export class FormService {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/attendanceservice/';
    private projects = 'projects';
    private years = 'years';
    private roles = 'roles';

    constructor(private http : HttpClient) { }

    getProjects(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + this.projects)
    }

    getRoles(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + this.roles);
    }

    getYears(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + this.years);
    }
}
