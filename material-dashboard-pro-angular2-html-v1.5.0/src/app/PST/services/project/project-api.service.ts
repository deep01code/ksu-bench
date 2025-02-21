import { Project } from './../../classes/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
@Injectable()
export class ProjectApiService {
    public SERVER_URL: string = environment.serverUrl;
    baseURL = this.SERVER_URL+"/";
    proejctURL = this.baseURL + "projects/";
    project: Project;
    index: number;
    constructor(private http: HttpClient) { }

    public getAllProjects() {
        return this.http.get<Project[]>(this.proejctURL);
    }

    public createProject(project: Project) {
        return this.http.post<Project>(this.proejctURL, project)
    }

    setContractIndex(i: any) {
        this.index=i
      }

      getContractIndex() {
        return this.index
      }

    public setProject(project: Project) {
        this.project = project;
    }

    public getProject() {
        return this.project;
    }

    public getProjectById(id) {
        return this.http.get<Project>(this.proejctURL + id);
    }

    public updateProject(id, project: Project) {
        console.log(id, project);
        return this.http.put<Project>(this.proejctURL + id, project)
    }

}
