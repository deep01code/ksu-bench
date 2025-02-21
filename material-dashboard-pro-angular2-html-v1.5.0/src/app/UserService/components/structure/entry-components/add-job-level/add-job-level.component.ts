import {Component, Inject, OnInit} from '@angular/core';
import {GlobalDTO, GlobalType} from "../../../../classes/managerialUnit";
import swal from "sweetalert2";
import {Domain, JobLevel, System} from "../../../../../PST/classes/system-domain";
import {StructureService} from "../../../../services/structureServices/structure.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-job-level',
  templateUrl: './add-job-level.component.html',
  styleUrls: ['./add-job-level.component.scss']
})
export class AddJobLevelComponent implements OnInit {

  tempJobLevel:JobLevel=new JobLevel();
  domain:Domain;
  constructor(public dialogRef: MatDialogRef<AddJobLevelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,) {

    if(this.data.jobLevel!=null){
      this.tempJobLevel=this.data.jobLevel;
    }
  }
  ngOnInit() {
  }

  onNoClick(): void {
    this.data.ref.loadDomainData();
    this.dialogRef.close();
  }



  addJobLevel(){
    let globalDTO:GlobalDTO =new GlobalDTO();
    this.tempJobLevel.type=GlobalType.JOBLEVEL
    globalDTO.domain=this.data.domain;
    globalDTO.jobLevel=this.tempJobLevel;
    globalDTO.type=GlobalType.JOBLEVEL
    this.structureServer.upsertDomainUnit(globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'Job Level Created successfully',
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
            text: 'Job Level Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
          this.data.ref.loadDomainData();
        }

    )
  }

}
