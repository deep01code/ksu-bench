import {Benefit, Employee} from './../../classes/employee';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {environment} from '../../../../environments/environment';
import {GlobalDTO} from "../../../UserService/classes/managerialUnit";
import {map} from "rxjs/operators";

@Injectable()
export class EmployeeService {
    public SERVER_URL: string = environment.serverUrl;

    private base = this.SERVER_URL+"/";
    private employeeURL = this.base + "employee";
    private getAllEmployeesURL = this.base+"employees";
    private uploadFileUrl=this.base+"uploadEmployeeFile";
    private employeeLogUrl=this.base+"employee-log";

    private downloadEmployeesUploadTemplateUrl=this.base+"download-employees-upload-template";
    private downloadSiteUploadTemplateUrl=this.base+"download-site-upload-template"
    private bulkUpsertEmployeeV2Url=this.base+"bulk-upsert-employee-v2";
    private bulkUpdateSite=this.base+"bulk-update-site";
    private upsertAttendanceUrl=this.base+"upsert-attendance";
    private deleteAttendanceUrl=this.base+"delete-attendance";

    constructor(private http: HttpClient) { }

    public createEmployee(globalDTO:GlobalDTO) {
        return this.http.post(this.employeeURL, globalDTO);
    }

    public upsertAttendance(globalDTO:GlobalDTO) {
        return this.http.post(this.upsertAttendanceUrl, globalDTO);
    }

    public deleteAttendance(globalDTO:GlobalDTO) {
        return this.http.post(this.deleteAttendanceUrl, globalDTO);
    }

    public getEmployeeLog(emp){
        return this.http.post(this.employeeLogUrl,emp);
    }

    public updateEmployee(emp){
        return this.http.put(this.employeeURL, emp);
    }
    public getAllEmployees(page,size){

        return this.http.get<Employee[]>(this.getAllEmployeesURL+'?page='+page+'&size='+size);
    }

    public  getEmployee(id){
        return this.http.get<Employee>(this.employeeURL+'?id='+id);
    }

    public deleteEmployeeBenefit(benefitId){
        return this.http.delete(this.base+'delete-benefit?id='+benefitId);
    }

    public addBenefit(employee,benefit){
        return this.http.post<Benefit>(this.base+'add-benefit',{
            employee:employee,
            benefit:benefit
        });
    }

    public getEmployeesCount(){
        return this.http.get(this.base+'employee-count');
    }

    upload(file: File,id,type): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', this.uploadFileUrl+'?id='+id+'&type='+type, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }



    public downloadEmployeeUploadTemplate(){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

        return this.http.get(this.downloadEmployeesUploadTemplateUrl, requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = "employees.xls";
            // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }
    public postBulkEmployeeFile(fileToUpload: File){
        const formData = new FormData();
        formData.append('file', fileToUpload);
        return this.http.post(this.bulkUpsertEmployeeV2Url,formData)
    }


    public downloadSiteUploadTemplate(){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

        return this.http.get(this.downloadSiteUploadTemplateUrl, requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = "site-update.xls";
            // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }
    public postBulkUpdateSiteFile(fileToUpload: File){
        const formData = new FormData();
        formData.append('file', fileToUpload);
        return this.http.post(this.bulkUpdateSite,formData)
    }
    /*
        getFiles(): Observable<any> {
            return this.http.get(`${this.baseUrl}/files`);
        }
    */

}
