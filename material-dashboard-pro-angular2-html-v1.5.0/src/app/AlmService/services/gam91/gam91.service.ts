import {Injectable} from '@angular/core';
import {Release} from '../../classes/gam91/release';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {ReleaseDate} from '../../classes/gam91/release-date';
import {ReleaseType} from '../../classes/gam91/release-type';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam91Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/almservice/';

    private listReleasesUrl = 'releaseDates/';

    private releaseDates = 'releaseDates/';

    private releaseTypes = 'releaseTypes/';

    private releaseDateUrl = 'releaseDate';


    constructor(private http: HttpClient) {
    }

    getAllReleases(): Observable<Release[]> {
        return this.http.get<Release[]>(this.baseUrl + this.listReleasesUrl);
    }


    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

    addReleaseDate(releaseDate: ReleaseDate): Observable<ReleaseDate> {
        return this.http.post<ReleaseDate>(this.baseUrl + this.releaseDates, releaseDate);
    }

    getReleaseDate(releaseTypeName: string, releaseNumber: string): Observable<ReleaseDate> {
        return this.http.get<ReleaseDate>(this.SERVER_URL+'/almservice/releaseDates/' + this.releaseDateUrl + '?type=' + releaseTypeName + '&number=' + releaseNumber);
    }

    getReleaseTypes(): Observable<ReleaseType[]> {
        return this.http.get<ReleaseType[]>(this.baseUrl + this.releaseTypes);
    }

    updateReleaseDate(releaseDate: ReleaseDate): Observable<ReleaseDate> {
        return this.http.put<ReleaseDate>(this.SERVER_URL+'/almservice/releaseDates/', releaseDate);
    }

    deleteSelectedRelease(releaseTypeName: string, releaseNumber: string): Observable<boolean> {
        return this.http
            .delete<boolean>(this.baseUrl + this.listReleasesUrl + '?type=' + releaseTypeName + '&number=' + releaseNumber)
    }


}
