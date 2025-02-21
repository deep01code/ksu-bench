import {Component, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {StructureService} from "../../../../services/structureServices/structure.service";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Agreement, AgreementItem, GlobalDTO, GlobalType, SearchFinancialDTO} from "../../../../classes/managerialUnit";
import swal from "sweetalert2";
import {LoVService} from "../../../../../PST/services/LoV/LoVService";
import {Domain, DomainBasicUnit, JobLevel, JobName, System} from "../../../../../PST/classes/system-domain";
//import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-add-agreement-item',
  templateUrl: './add-agreement-item.component.html',
  styleUrls: ['./add-agreement-item.component.scss']
})
export class AddAgreementItemComponent implements OnInit {

  agreement:Agreement=new Agreement();
  tempAgreementItem:AgreementItem=new AgreementItem();
  domains:Domain[]=[];
  selectedDomain:Domain;
  selectedSystem:System;
  selectedJobName:JobName;
  selectedJobLevel:JobLevel;

    systemFilter:Domain;
    jobNameFilter:Domain;
    jobLevelFilter:Domain;

  jobNames=[]
  isLoading:boolean=false;
  constructor(public dialogRef: MatDialogRef<AddAgreementItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public vendorApisService:VednorApisService,
              public LovApi: LoVService,) {

         // this.LovApi.getDomains().subscribe((res)=>{ this.domains=res;    } ,()=>{},()=>{this.isLoading=false;});
         // this.LovApi.getJobNames().subscribe((res)=>{ this.jobNames=res} ,()=>{},()=>{this.isLoading=false;});

      if(this.data.agreementItem!=null){
          this.tempAgreementItem=this.data.agreementItem;
      }
      this.systemFilter=new Domain();
      this.systemFilter.type=GlobalType.SYSTEM;

      this.jobNameFilter=new Domain();
      this.jobNameFilter.type=GlobalType.JOBNAME;

      this.jobLevelFilter=new Domain();
      this.jobLevelFilter.type=GlobalType.JOBLEVEL;

      let searchFinancialDTO:SearchFinancialDTO= new SearchFinancialDTO();
      searchFinancialDTO.type=GlobalType.DOMAIN;

      this.structureServer.getAllDomainUnits(searchFinancialDTO).subscribe(
             data=>{this.domains =data['domains'] as Domain[];},
             err=>{},
             ()=>{}
         )


  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAgreementItem(){

    this.agreement=this.data.agreement;
    let globalDTO:GlobalDTO=new GlobalDTO();
    globalDTO.agreement=this.agreement;
    globalDTO.agreementItem=this.tempAgreementItem;
    this.vendorApisService.upsertAgreementItem(globalDTO).subscribe(
        data=>{
          swal({
            title: 'Done!',
            text: 'Agreement Created successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.data.ref.loadAgreementData();
          this.dialogRef.close();


        },
        err=>{
          swal({
            title: 'Error',
            text: 'PO Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
            this.data.ref.loadAgreementData();
            this.dialogRef.close();

        }

    )
  }


    compareObjects(o1: any, o2: any): boolean {
        return o1.id === o2.id;
    }


}


@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: DomainBasicUnit): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.type.indexOf(filter.type) !== -1);
    }

}
