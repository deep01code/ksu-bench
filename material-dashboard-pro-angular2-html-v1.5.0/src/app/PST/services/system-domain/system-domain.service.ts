import { Section } from './../../classes/GeneralDepartment';
import { System } from './../../classes/system-domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class SystemDomainService {
    public SERVER_URL: string = environment.serverUrl;
    baseURL = this.SERVER_URL+"/";
    systemDomainURL = this.baseURL + "systemdomains/";
    systemDomain: System = null;
    constructor(private http: HttpClient) { }

    getSystemDomains(){
        return this.http.get<System[]>(this.systemDomainURL);
    }

    createSystem(system: System) {
        return this.http.post(this.systemDomainURL, system)
    }

    updateSystemDomain(system: System){
        return this.http.put<System>(this.systemDomainURL+system.id, system);
    }

    setSystemDomain(systemDomain: System) {
        this.systemDomain = systemDomain;
    }
    //fixme
    getSystemDomain() {
        
     /*   this.systemDomain ? this.systemDomain : this.systemDomain = {
            id: 0,
            sectionId: 0,
            systemDomainNumber: null,
            systemDomainEngName: null,
            systemDescription: null,
            companyName: null,
            companyCountry: null,
            section: new Section()
        };*/
        return this.systemDomain;
    }

    getSystemDomainFromBackEnd(id:number){
        return this.http.get<System>(this.systemDomainURL+id);
    }
}
