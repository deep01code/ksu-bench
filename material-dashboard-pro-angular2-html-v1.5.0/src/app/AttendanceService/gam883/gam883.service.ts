import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam883Service {
    public SERVER_URL: string = environment.serverUrl;
    private projectsNamesFromRadianceDB = this.SERVER_URL+'/attendanceservice/projects';

    private attendanceManagement = this.SERVER_URL+'/attendnaceprojectmanagementservice';
    // private attendanceManagement = 'http://localhost:7287';
    private projectsUrl = '/projects';
    private projectsManagementServiceUrl = this.attendanceManagement+'/projects';
    private projectUrl = '/project';

    private budgetUrl = this.attendanceManagement+'/budget/';

    constructor(private http:HttpClient) { }

    getProjects():Observable<any>{
        return this.http.get<any>(this.projectsManagementServiceUrl + this.projectsUrl);
    }

    addProject(project):Observable<any>{
        return this.http.post<any>(this.projectsManagementServiceUrl+this.projectUrl,project);
    }

    updateProject(project):Observable<any>{
        return this.http.put<any>(this.projectsManagementServiceUrl+this.projectUrl,project);
    }

    getProjectNamesFromRadianceDB():Observable<any[]>{
        console.log(this.projectsNamesFromRadianceDB)
        return this.http.get<any[]>(this.projectsNamesFromRadianceDB);
    }

    addBudget(budget):Observable<any>{
        return this.http.post<any>(this.budgetUrl,budget);
    }

    updateBudget(budget):Observable<any>{
        return this.http.put<any>(this.budgetUrl,budget);
    }

    addProgram(program):Observable<any>{
        return this.http.post<any>(this.attendanceManagement+'/programs',program);
    }

    getPrograms():Observable<any[]>{
        return this.http.get<any[]>(this.attendanceManagement+'/programs');
    }
    updateProgram(programId, program):Observable<any[]>{
        console.log(program);
        return this.http.put<any[]>(this.attendanceManagement+'/programs/'+programId, program);
    }
    getDepartments(programId):Observable<any[]>{
        return this.http.get<any[]>(this.attendanceManagement+'/programs/'+programId+'/departments');
    }

    addDepartment(programId,department):Observable<any>{
        return this.http.post<any>(this.attendanceManagement+'/programs/'+programId+'/departments',department);
    }

    updateDepartment(department):Observable<any>{
        return this.http.put<any>(this.attendanceManagement+'/programs/departments/'+department.id,department);
    }

    createBudget(programId,budget):Observable<any>{
        return this.http.post<any>(this.attendanceManagement+'/programs/'+programId+'/budgets',budget);
    }

    getProgramById(programId):Observable<any>{
        return this.http.get<any>(this.attendanceManagement+'/programs/'+programId);
    }

    addNewProgramResponsible(programId,responsible):Observable<any> {
        return this.http.post(this.attendanceManagement+"/programs/"+programId+"/responsibles",responsible);
    }

    updateProgramConfig(program: any) {
        console.log(program)
        return this.http.put<any>(this.attendanceManagement+"/programs/"+program.id+"/config", program);
    }
}
