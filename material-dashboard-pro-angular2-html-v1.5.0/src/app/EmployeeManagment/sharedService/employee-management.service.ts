import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from '../../../environments/environment';
@Injectable()
export class EmployeeManagementService {
    public SERVER_URL: string = environment.serverUrl;
    private url = this.SERVER_URL+'/employeeservice/';
    private historyPreEndPoint = this.SERVER_URL+'/employeeservice/employees/';
    private historyPostEndPoint = '/history/allocation';
    private programsEndpoint = this.SERVER_URL+'/attendnaceprojectmanagementservice/programs';

    // private historyPreEndPoint = 'http://localhost:7297/employees/';
    // private historyPostEndPoint = '/history/allocation';
    // private url = 'http://localhost:7297/';
    // private programsEndpoint = 'http://localhost:7287/programs';

    private employees: Observable<any[]>;
    private employeeHistory: Observable<any[]>;
    public employee: any;
    private selectedProgram;
    private selectedDepartment;
    constructor(private http: HttpClient,
        private route: ActivatedRoute) { }

    public setEmployee(employee) {
        this.employee = employee;
        this.employeeHistory = this.setEmployeeHist(employee);
    }

    public getEmployee(url): Observable<any> {
        return this.http.get<any>(url);
    }

    public getEmployeeHistory(id): Observable<any> {
        if (!this.employeeHistory) {
            this.employeeHistory = this.http.get<any>(this.historyPreEndPoint + id + this.historyPostEndPoint)
        }
        return this.employeeHistory;
    }

    getAllEmployees(programName): Observable<any[]> {
        if (!this.employees) {
            return this.http.get<any[]>(this.url + programName + "/employees");
        }
        else {
            return this.employees;
        }
    }

    setEmployeeHist(employee): Observable<any[]> {

        if (employee.links) {
            let uri = employee.links[3].href;
            return this.employeeHistory = this.http.get<any[]>(uri);
        } else if (employee._links.allocationHistory) {
            return this.employeeHistory = this.http.get<any[]>(employee._links.allocationHistory);
        }
    }

    updateAllHP(programName) {
        return this.http.put<any[]>(this.url + programName + "/employees", null);
    }
    updateAllocation(form): Observable<any[]> {

        let allocationEndpoint: string = this.employee._links.allocationHistory.href ? this.employee._links.allocationHistory.href : this.employee.links[3].href;
        form.program = form.program.name;
        form.department = form.department.name;
        return this.http.put<any[]>(allocationEndpoint, form)
    }

    resignEmployee(date): Observable<any[]> {
        let resignEndpoint = this.employee.links[0].href;
        return this.http.delete<any[]>(resignEndpoint + '?date=' + date);
    }
    public addEmployee(programName, employee, sDate): Observable<any> {
        return this.http.post<any>(this.url + programName + "/employees", { employee: employee, startDate: sDate });
    }

    public getPrograms(): Observable<any[]> {
        return this.http.get<any[]>(this.programsEndpoint)
    }

    public setSelectedProgram(program) {

        this.selectedProgram = program;
    }
    public setSelectedDepartment(department) {
        this.selectedDepartment = department;
    }
    public getSelectedProgram() {
        return this.selectedProgram;
    }
    public getSelectedDepartment() {
        return this.selectedDepartment;
    }
}
