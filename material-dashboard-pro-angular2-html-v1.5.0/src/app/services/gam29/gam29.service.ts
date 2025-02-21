import { Injectable } from '@angular/core';
import { ListRelease } from '../../classes/gam29/list-release';
import { NameCount } from '../../classes/gam6/name-count';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam29Service {
  public SERVER_URL: string = environment.serverUrl;
  private baseUrl = this.SERVER_URL+'/alm/defect/';
  private listReleasesUrl = 'releases';
  private defectsPerCRInReleaseUrl = 'reopenedDefectsPerCRInRelease?id=';

  constructor(private http: HttpClient) { }
  getCRsWithDefectsInRelease(id): Observable<NameCount[]> {
    return this.http.get<NameCount[]>(this.baseUrl + this.defectsPerCRInReleaseUrl + id);
  }
  getListReleases(): Observable<ListRelease[]> {
    return this.http.get<ListRelease[]>(this.baseUrl + this.listReleasesUrl);
  }

}
