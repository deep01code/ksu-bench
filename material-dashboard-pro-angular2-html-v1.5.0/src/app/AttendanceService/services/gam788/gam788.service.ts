import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Workflow} from '../../../approval/classes/workflow';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class Gam788Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl=this.SERVER_URL+"/workflowservice/"
    private approveCost="approveCost/"
    private rejectCost="rejectCost/"
    private payInvoice="payInvoice/"
    private attendance_workflow="attendance_workflow/"
    private pending ="pending"
    private approved ="approved"
    private rejected="rejected"
    private not_paid="not_paid"
    private paid="paid"
    private in_progress="in_progress/"
    private downlod="download/";

    constructor(private http : HttpClient) { }






    public getWorkflow(id,token):Observable<Workflow>{
        return this.http.get<Workflow>(this.baseUrl+this.attendance_workflow+id,);
    }




    public approvedFlow(page,size):Observable<any>{
        return this.http.get<any>(this.baseUrl+this.approved+'?page='+(page-1)+'&size='+size+'&sort=creation_time,desc')
    }

    public rejectedFlow(page,size):Observable<any>{
        return this.http.get<any>(this.baseUrl+this.rejected+'?page='+(page-1)+'&size='+size+'&sort=creation_time,desc')
    }


    public pendingFlow(page,size):Observable<any>{
        return this.http.get<any>(this.baseUrl+this.pending+'?page='+(page-1)+'&size='+size+'&sort=creation_time,desc')
    }

    public notPaidFlow(page,size):Observable<any> {
        return this.http.get<any>(this.baseUrl+this.not_paid+'?page='+(page-1)+'&size='+size+'&sort=creation_time,desc')
    }

    public paidFlow(page,size):Observable<any>{
        return this.http.get<any>(this.baseUrl+this.paid+'?page='+(page-1)+'&size='+size+'&sort=creation_time,desc')
    }

    public payInvoiceMethod(id,invoiceInfo):Observable<any>{
        return this.http.put<any>(this.baseUrl+this.payInvoice+id,invoiceInfo, )
    }

    public download(path,token){
        this.http.get<any>(this.baseUrl+this.download+'?path='+path,)
    }

}
