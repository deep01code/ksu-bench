import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { LdapRequest } from './classes/ldap-request';
import { LdapResponse} from './classes/ldap-response';
import {DropDownList} from './classes/drop-down-list';
import {TableRequest} from './classes/table-request';
import {environment} from '../../../environments/environment';
@Injectable()
export class Gam205Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/scaservice/';

    private ldapUrl = 'ldap/get';

    private dbTableUrl = 'database/get';

    constructor(private http:HttpClient) { }

  getLdapInfo(email:LdapRequest):Observable<LdapResponse>{
      return this.http.post<LdapResponse>( this.baseUrl+this.ldapUrl,email);
  }

  getDropDownList(req:TableRequest):Observable<DropDownList>{
      return this.http.post<DropDownList>(this.baseUrl+this.dbTableUrl,req);
  }



}
