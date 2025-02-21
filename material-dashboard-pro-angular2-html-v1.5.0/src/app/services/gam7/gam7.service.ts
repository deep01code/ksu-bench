import { Injectable } from '@angular/core';
import {ListRelease} from '../../classes/gam29/list-release';
import {Observable} from 'rxjs/Observable';
import {NameCount} from '../../classes/gam6/name-count';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam7Service {
  public SERVER_URL: string = environment.serverUrl;
  private url=this.SERVER_URL+'/alm/defect/releases';
  private url2=this.SERVER_URL+'/alm/defect/testerRejectedDefectsPerRelease?id=';
  constructor(private http:HttpClient) { }

  getReleases(): Observable<ListRelease[]>{
    return this.http.get<ListRelease[]>(this.url);
  }

  getTesterDefects(id):Observable<NameCount[]>{
      return this.http.get<NameCount[]>(this.url2+id);
  }

}
