import { Component, OnInit } from '@angular/core';
import {Gam709Service} from '../../services/gam709.service';
import {Workflow} from '../../classes/workflow';
import {ActivatedRoute} from '@angular/router';
import {AuthSdkService} from '../../../services/auth-sdk/auth-sdk.service';
import swal from 'sweetalert2';
import {FormControl, FormGroup} from '@angular/forms';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-gam709',
  templateUrl: './gam709.component.html',
  styleUrls: ['./gam709.component.scss']
})
export class Gam709Component implements OnInit {

    private result:[Workflow]
    token: string;
    workflowId:string
    validToken:boolean;
    done:boolean=false;
    workflow:any;
    action:any;
    form = new FormGroup({
        action: new FormControl(),
        justification: new FormControl()
    });
  constructor(private api:Gam709Service,private route: ActivatedRoute,private authSDK: AuthSdkService,private alert:AlertService) {

      this.route.queryParams.subscribe(params => {

          this.token = params['token'];
          this.workflowId = params['id'];
          this.authSDK.isValid(this.token).subscribe((data)=>{
              this.validToken=true;
          },(err)=>{
              this.validToken=false
          })
          this.api.getWorkflow(this.workflowId,this.token).subscribe((data)=>{

              this.workflow=data;

          })

      });
      setTimeout(()=>{},1000)

  }


    approve(){
        this.alert.log("Approval","You are about to approve auto generated cost reported, are you sure ?", "Yes","Cost Report Approved","Your transaction was successfully completed",()=>{
            this.api.approve(this.workflowId,this.token).subscribe(()=>{this.done=true})
        },()=>{})

    }


    reject(){

        this.alert.log("Reject","You are about to reject auto generated cost reported, are you sure ?", "Yes","Cost Report Rejected","Your transaction was successfully completed",()=>{
            this.api.reject(this.workflowId,this.token,this.form.value.justification).subscribe(()=>{this.done=true;})
        },()=>{})


    }



    submit(){

      if(this.form.value.action=='approve'){
          this.approve()
      }

      if(this.form.value.action=='reject' && this.form.value.justification!=null){
        this.reject()
      }

      if(this.form.value.action=='reject' && this.form.value.justification==null){
          swal("Error","Please write your justification","error")
      }
    }



    payInvoice(){
        this.api.payInvoiceMethod(this.workflowId,this.token).subscribe((data)=>{
            swal("Success","Generated Cost Report successfully approved","success")
        },(err)=>{
            swal("Error",err,"error")
        })
    }


    download(){
      this.api.download(this.workflow.reportPath,this.token)
    }


    numberWithCommas(x) {
        return   x.toLocaleString()
    }


    isLessThan10(x){
        if(x ==null || x.length>10 ){return false;}
        return true;
    }


    isClickable(){
        //form.value.action && !form.value.justification   && !isLessThan10(form.value.justification)
        if(this.form.value.action==null || this.form.value.action==''){
            return false;
        }

        if(this.form.value.action=='approve'){
            return true;
        }

        if(this.form.value.action=='reject'){

            if(this.form.value.justification ==null ){return false;}
            if(this.form.value.justification && (!this.isLessThan10(this.form.value.justification))  ){ return true;}

        }

        return false;

    }
  ngOnInit() {

  }


}
