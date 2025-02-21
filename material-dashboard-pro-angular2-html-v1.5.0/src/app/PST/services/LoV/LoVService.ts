import { GeneralDepartment } from '../../classes/GeneralDepartment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {LovDTO} from "../../classes/lovDTO";
@Injectable()
export class LoVService {

constructor(private http: HttpClient) { }
    public SERVER_URL: string = environment.serverUrl;
    base= this.SERVER_URL+"/";
    generalDepartmentURL=this.base+"hierarchies";
    companiesUrl = this.base+"companies";
    departmentsUrl = this.base+"departments";
    sections = this.base+"sections";

    //fixme
    domains =this.base+"domains";
    levels =this.base+"levels";
    workingtypes=this.base+"working-types";
    jobcategories=this.base+"job-categories";
    jobnames=this.base+"job-names";
    nationalities=this.base+"nationalities";

    addLov=this.base+"add-lov";
    removeLov=this.base+"remove-lov";


    public getDomains(){
        return this.http.get<any>(this.domains);
    }

    public getLevels(){
        return this.http.get<any>(this.levels);
    }

    public getWorkingTypes(){
        return this.http.get<any>(this.workingtypes);
    }

    public getJobCategories(){
        return this.http.get<any>(this.jobcategories);
    }

    public getJobNames(){
        return this.http.get<any>(this.jobnames);
    }

    public getNationalities(){
        return this.http.get<any>(this.nationalities);
    }


public getGeneralDepartments(){
    return this.http.get<GeneralDepartment[]>(this.generalDepartmentURL);
}
public getCompanies(){
    return this.http.get<any[]>(this.companiesUrl);
}

public getDepartmentByGeneralDepartmentID(id){
    return this.http.get<any[]>(this.departmentsUrl+'?id='+id);
}

public getSectionsByDepartmentID(id){
    return this.http.get<any[]>(this.sections+'?id='+id);
}

public addLovFunction(lovDTO:LovDTO){
        return this.http.post(this.addLov,lovDTO);
}

public removeLovFunction(lovDTO:LovDTO){
    return this.http.post(this.removeLov,lovDTO);
}


}
