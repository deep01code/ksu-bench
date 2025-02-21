import { Component, OnInit } from '@angular/core';
import {Gam788Service} from '../../services/gam788/gam788.service';
import swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material';
import {AlertService} from '../../../services/alert/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gam788',
  templateUrl: './gam788.component.html',
  styleUrls: ['./gam788.component.scss']
})
export class Gam788Component implements OnInit {

    tableType:string='PENDING'
    data:any[]
    currentTap='PENDING'
    selected=[];
    reportSummaryDataSource:any;
    reportColumns = ['Role','Normal Days','Weekends','Exceptions Counted',
        'Total Days','No Of Employees','Rate','Cost'];
    line:any;

    invoiceForm = new FormGroup({
        invoiceNo:new FormControl('',[Validators.required]),
        receivingRecordNo:new FormControl('',[Validators.required]),
        technicalReportNo:new FormControl('',[Validators.required])
    })

    page=1
    size=4
    p: number = this.page;
    total: number;
    loading: boolean;
    public isLoading:boolean;

  constructor(private api:Gam788Service,private alert:AlertService) {
      this.getPending(this.page,this.size)
  }

  ngOnInit() {
        this.getPending(this.page,this.size)
  }

  calculateTotal(array){



        var sumNormalManDays=0,sumApprovedWeekEnds=0,sumApprovedOthers=0,sumTotalManDays=0,sumNumberOfEmployees=0,sumCost=0,sumExceptionsCounted=0,sumExceptionsManDays=0;
        for(var i =0;i<array.length;i++){

            sumNormalManDays+=array[i].normalManDays;
            sumApprovedWeekEnds+=array[i].approvedWeekEnds;
            sumApprovedOthers+=array[i].approvedOthers;
            sumTotalManDays+=array[i].totalManDays;
            sumNumberOfEmployees+=array[i].numberOfEmployees;
            sumExceptionsManDays+=array[i].exceptionsManDays;
            sumExceptionsCounted+=array[i].exceptionsCounted;
            sumCost+=array[i].cost;

        }
        if(array[array.length-1].roleName!="Cumulative Total"){
            array.push(
                {
                    "roleName": "Cumulative Total",
                    "normalManDays": sumNormalManDays,
                    "approvedWeekEnds": sumApprovedWeekEnds,
                    "exceptionsManDays":sumExceptionsManDays,
                    "exceptionsCounted":sumExceptionsCounted,
                    "approvedOthers": sumApprovedOthers,
                    "totalManDays": sumTotalManDays,
                    "numberOfEmployees": sumNumberOfEmployees,
                    "rate": '---',
                    "cost": sumCost
                },
            )
        }


        return array;
    }


    select(item){
     this.line=item;
    console.log(this.line.reportPath)
     this.selected=item.attendanceReport.roleCost;

     this.selected=this.calculateTotal(this.selected)
     this.reportSummaryDataSource =new MatTableDataSource(this.selected);
     /*if(this.currentTap=='APPROVED'){
         console.log('inside the if')
         this.line.attendanceReport.invoiceNo=null
         this.line.attendanceReport.receivingRecordNo=null
         this.line.attendanceReport.technicalReportNo=null
     }*/
  }



    tabIsClicked(event){
        this.selected=null;
        this.data=[]
        this.page=1;

        if(event=='PENDING'){this.getPending(this.page,this.size); this.currentTap=event}
        if(event=='APPROVED'){this.getApproved(this.page,this.size); this.currentTap=event}
        if(event=='REJECTED'){this.getRejected(this.page,this.size); this.currentTap=event}
        if(event=='NOTPAID'){this.getNotPaid(this.page,this.size); this.currentTap=event}
        if(event=='PAIED'){this.getPaid(this.page,this.size); this.currentTap=event}

    }


    getPending(page,size){
        this.api.pendingFlow(page,size).subscribe(data=>{
            this.data=data.content;
            this.total = data.totalElements;
            this.p = page;
            this.select(this.data[0]);

        })
    }

    getApproved(page,size){
        this.api.approvedFlow(page,size).subscribe(data=>{
            this.data=data.content;
            this.total = data.totalElements;
            this.p = page;
            this.select(this.data[0]);

        })
    }

    getRejected(page,size){
        this.api.rejectedFlow(page,size).subscribe(data=>{
            this.data=data.content;
            this.total = data.totalElements;
            this.p = page;
            this.select(this.data[0]);

        })
    }

    getNotPaid(page,size){
        this.api.notPaidFlow(page,size).subscribe(data=>{
            this.data=data.content;
            this.total = data.totalElements;
            this.p = page;
            this.select(this.data[0]);

        })
    }


    getPaid(page,size){
        this.api.paidFlow(page,size).subscribe(data=>{
            this.data=data.content;
            this.total = data.totalElements;
            this.p = page;
            this.select(this.data[0]);
        })
    }


    payInvoice(id,invoiceInfo){
      this.isLoading=true;
        this.alert.log("Payment","You are about to make invoice payment, are you sure ?", "Yes","Invoice Paid","Your transaction was successfully completed",()=>{
            this.api.payInvoiceMethod(id,invoiceInfo).subscribe(()=>{
                this.isLoading=false;
                this.getApproved(this.page,this.size); this.line=null;})

        },()=>{})

    }


    getPage(page: number) {

        if(this.currentTap=='PENDING'){this.getPending(page,this.size);  }
        if(this.currentTap=='APPROVED'){this.getApproved(page,this.size);  }
        if(this.currentTap=='REJECTED'){this.getRejected(page,this.size);  }
        if(this.currentTap=='NOTPAID'){this.getNotPaid(page,this.size);  }
        if(this.currentTap=='PAIED'){this.getPaid(page,this.size);  }

    }


    numberWithCommas(x) {
      return   x.toLocaleString()

    }

    isPaidTab(){
       if(this.currentTap=="PAIED")
       {return true}
       return false;
    }

}
