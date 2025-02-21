import {Component, Inject, OnInit} from '@angular/core';
import {StructureService} from "../../../../services/structureServices/structure.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {GlobalDTO, GlobalType} from "../../../../classes/managerialUnit";
import swal from "sweetalert2";
import {Domain, System} from "../../../../../PST/classes/system-domain";

@Component({
  selector: 'app-add-system',
  templateUrl: './add-system.component.html',
  styleUrls: ['./add-system.component.scss']
})
export class AddSystemComponent implements OnInit {

  tempSystem:System=new System();
  domain:Domain;
  constructor(public dialogRef: MatDialogRef<AddSystemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,) {

    if(this.data.system!=null){
      this.tempSystem=this.data.system;
    }
  }

  ngOnInit() {
  }


  onNoClick(): void {
    this.data.ref.loadDomainData();
    this.dialogRef.close();
  }



  addSystem(){
    let globalDTO:GlobalDTO =new GlobalDTO();
    this.tempSystem.type=GlobalType.SYSTEM
    globalDTO.domain=this.data.domain;
    globalDTO.system=this.tempSystem;
    globalDTO.type=GlobalType.SYSTEM
    this.structureServer.upsertDomainUnit(globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'System Created successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.data.ref.loadDomainData();
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
          this.data.ref.loadDomainData();
        }

    )
  }


}
