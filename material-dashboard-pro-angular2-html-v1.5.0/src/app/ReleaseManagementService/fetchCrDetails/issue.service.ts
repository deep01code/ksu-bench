import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
@Injectable()
export class IssueService {
  public SERVER_URL: string = environment.serverUrl;
  constructor(private http: HttpClient) { }
  private baseUrl = this.SERVER_URL+'/employeeservice/';
  private issueUrl = this.baseUrl+'issue/'
  public getIssue(issue): Observable<any>{
      return this.http.get<any>(this.issueUrl+issue);
  }
}
