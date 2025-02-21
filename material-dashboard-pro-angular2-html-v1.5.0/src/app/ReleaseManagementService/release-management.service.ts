import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable()
export class ReleaseManagementService {
    public SERVER_URL: string = environment.serverUrl;
    private serviceUrl = this.SERVER_URL+'/reportgenerationservice/';
    private releasesControllerUrl = 'releases/';
    private releaseUrl = 'release';



    constructor(private http:HttpClient) { }

    addRelease(release:any):Observable<any>{
        return this.http.post(this.serviceUrl+this.releasesControllerUrl+this.releaseUrl,release);
    }

    updateRelease(release:any):Observable<any>{
        return this.http.put(this.serviceUrl+this.releasesControllerUrl+this.releaseUrl,release);
    }

    getReleases():Observable<any[]>{
        return this.http.get<any[]>(this.serviceUrl+this.releasesControllerUrl+'/');
    }

}
