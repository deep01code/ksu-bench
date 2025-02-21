import {Component, Inject, OnInit} from '@angular/core';
import {StructureService} from "../../../../services/structureServices/structure.service";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {GlobalType, GlobalDTO} from "../../../../classes/managerialUnit";
import swal from "sweetalert2";
import {Domain} from "../../../../../PST/classes/system-domain";

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent implements OnInit {

  /*  vendor:Vendor=new Vendor();
  tempAgreement:Agreement=new Agreement();*/

  tempDomain:Domain=new Domain();
  constructor(public dialogRef: MatDialogRef<AddDomainComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public vendorApisService:VednorApisService) {


  }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  /*addAgreement(){

    this.vendor=this.data.vendor;
    let globalDTO:FinancialUnitDTO=new FinancialUnitDTO();
    globalDTO.agreement=this.tempAgreement;
    globalDTO.vendor=this.vendor;
    this.vendorApisService.upsertAgreement(globalDTO).subscribe(
        data=>{
          swal({
            title: 'Done!',
            text: 'Agreement Created successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.data.ref.loadVendorData();
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
          this.dialogRef.close();

        }

    )
  }*/

    addDomain(){
     let globalDTO:GlobalDTO =new GlobalDTO();
     this.tempDomain.type=GlobalType.DOMAIN
     globalDTO.managerialUnit=this.data.unitParent;
     globalDTO.domain=this.tempDomain;
     globalDTO.type=GlobalType.DOMAIN
      this.structureServer.upsertDomainUnit(globalDTO).subscribe(
          (data)=>{
            swal({
              title: 'Done!',
              text: 'Domain Created successfully',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
            this.data.ref.fetchTree();
            this.data.ref.loadPaginationTables();
            this.dialogRef.close();
          },
          (err)=>{
            console.log(err);
            swal({
              title: 'Error',
              text: 'Domain Information Duplicated',
              type: 'error',
              confirmButtonClass: 'btn btn-danger',
              buttonsStyling: false
            });
          }

      )
    }
}
