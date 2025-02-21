import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Workflow} from '../classes/workflow';
import {environment} from '../../../environments/environment';

@Injectable()
export class Gam709Service {
    public SERVER_URL: string = environment.serverUrl;
    private baseUrl=this.SERVER_URL+"/workflowservice/"
    private approveCost="approveCost/"
    private rejectCost="rejectCost/"
    private payInvoice="payInvoice/"
    private attendance_workflow="attendance_workflow/"
    private pending ="pending/"
    private approved ="approved/"
    private rejected="rejected/"
    private not_paid="not_paid/"
    private paid="paid/"
    private in_progress="in_progress/"
    private downlod="download/";

  constructor(private http : HttpClient) { }



    getAllWorkflow(): Observable<[Workflow]> {
        return this.http.get<[Workflow]>(this.baseUrl +this.attendance_workflow);
    }


    getWorkflow(id,token):Observable<Workflow>{
        return this.http.get<Workflow>(this.baseUrl+this.attendance_workflow+id,{headers: {"Authorization": "Bearer " + token}});
    }

    approve(id,token):Observable<any>{
        return this.http.put<any>(this.baseUrl+this.approveCost+id, null,{headers: {"Authorization": "Bearer " + token}})
    }

    reject(id,token,justification):Observable<any>{
        return this.http.put<any>(this.baseUrl+this.rejectCost+id+'?justification='+justification, null,{headers: {"Authorization": "Bearer " + token}})
    }

    payInvoiceMethod(id,token):Observable<any>{
        return this.http.put<any>(this.baseUrl+this.payInvoice+id,null, {headers: {"Authorization": "Bearer " + token}})
    }

    download(path,token){
      this.http.get<any>(this.baseUrl+this.download+'?path='+path,{headers: {"Authorization": "Bearer " + token}})
    }

}
