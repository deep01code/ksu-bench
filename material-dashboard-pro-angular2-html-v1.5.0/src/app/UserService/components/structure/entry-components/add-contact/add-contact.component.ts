import {Component, Inject, OnInit} from '@angular/core';
import {Contact, Vendor} from "../../../../../PST/classes/vendor";
import {Agreement, AgreementType, GlobalDTO} from "../../../../classes/managerialUnit";
import {StructureService} from "../../../../services/structureServices/structure.service";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";
import swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  vendor:Vendor=new Vendor();
  tempContact:Contact=new Contact();

  constructor(public dialogRef: MatDialogRef<AddContactComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public vendorApisService:VednorApisService) {

    if(data.contact){
      this.tempContact=data.contact;
    }
  }

  ngOnInit() {
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  addContact(){

    this.vendor=this.data.vendor;
    let globalDTO:GlobalDTO=new GlobalDTO();
    globalDTO.contact=this.tempContact;
    globalDTO.vendor=this.vendor;
    this.vendorApisService.upsertContact(globalDTO).subscribe(
        data=>{
          swal({
            title: 'Done!',
            text: 'Contact Created successfully',
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
            text: 'Contact Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
          this.dialogRef.close();

        }

    )
  }

}
