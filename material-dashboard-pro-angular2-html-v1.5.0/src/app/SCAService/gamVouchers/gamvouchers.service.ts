import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Voucherrequest } from '../gamVouchers/classes/voucherrequest';
import { Voucherrespoend } from '../gamVouchers/classes/voucherrespoend';
import {environment} from '../../../environments/environment';
@Injectable()
export class GamvouchersService {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl = this.SERVER_URL+'/scaservice/database/get';

    constructor(private http: HttpClient) {
    }

    getVoucher(entry: Voucherrequest): Observable<Voucherrespoend> {
        return this.http.post<Voucherrespoend>(this.baseUrl, entry);
    }

}
