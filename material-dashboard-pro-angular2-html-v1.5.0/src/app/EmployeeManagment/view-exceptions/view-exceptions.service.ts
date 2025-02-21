import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
@Injectable()
export class ViewExceptionsService {
  public SERVER_URL: string = environment.serverUrl;
  private baseUrl = this.SERVER_URL+'/employeeservice/';
  // private baseUrl = 'http://localhost:7297/';
  private getExceptionsEndpoint = this.baseUrl+'exception/filter/';
  private exceptionsEndpoint = this.baseUrl+'exceptions/lookups/';

  constructor(private http: HttpClient) { }

  public getEmployeesExceptions(obj){
    let request = {
      employee: {
        program: obj.program,
        department: obj.department
      }
    }
      return this.http.post<any[]>(this.getExceptionsEndpoint, request)
  }

  public getExceptions(): Observable<any>{
      return this.http.get<any>(this.exceptionsEndpoint);
  }
}
