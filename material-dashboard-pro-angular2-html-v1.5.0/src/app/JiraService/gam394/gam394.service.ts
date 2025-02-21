import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam394Service {
    public SERVER_URL: string = environment.serverUrl;
  private url = this.SERVER_URL+"/stcjiraservice/changeRequest";

 parseXml ="";
    constructor(private http: HttpClient) { }

  public postChangeRequest(body):Observable<any>{
      //var headers = new HttpHeaders();
      //headers.append('Accept', 'application/xml');
      return this.http.post(this.url, body);
  }
}
