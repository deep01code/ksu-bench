import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PrepaidVotcherReq} from '../gamPrepaidVouchers/classes/prepaid-votcher-req';
import {PrepaidVotcherRespons} from '../gamPrepaidVouchers/classes/prepaid-votcher-respons';
import {environment} from '../../../environments/environment';
@Injectable()
export class PrepaidVoucherService {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/scaservice/database/get';

    constructor(private http: HttpClient) { }

    getPrepaidVoucher(entry: PrepaidVotcherReq): Observable<PrepaidVotcherRespons> {
        return this.http.post<PrepaidVotcherRespons>(this.baseUrl,entry);
    }
}
