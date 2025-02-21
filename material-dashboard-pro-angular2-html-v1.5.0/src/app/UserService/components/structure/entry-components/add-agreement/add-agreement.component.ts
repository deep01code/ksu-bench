import {Component, Inject, OnInit} from '@angular/core';
import {StructureService} from "../../../../services/structureServices/structure.service";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Vendor} from "../../../../../PST/classes/vendor";
import {Agreement, AgreementType, GlobalDTO,} from "../../../../classes/managerialUnit";
import swal from "sweetalert2";

@Component({
  selector: 'app-add-agreement',
  templateUrl: './add-agreement.component.html',
  styleUrls: ['./add-agreement.component.scss']
})
export class AddAgreementComponent implements OnInit {

  vendor:Vendor=new Vendor();
  tempAgreement:Agreement=new Agreement();
  agreementTypes=Object.values(AgreementType);

  constructor(public dialogRef: MatDialogRef<AddAgreementComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public vendorApisService:VednorApisService) { }

  ngOnInit() {
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  addAgreement(){

    this.vendor=this.data.vendor;
    let globalDTO:GlobalDTO=new GlobalDTO();
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
            text: 'Agreement Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
          this.dialogRef.close();

        }

    )
  }

}
