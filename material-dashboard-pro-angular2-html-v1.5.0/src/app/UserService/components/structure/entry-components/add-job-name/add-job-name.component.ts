import {Component, Inject, OnInit} from '@angular/core';
import {GlobalDTO, GlobalType} from "../../../../classes/managerialUnit";
import swal from "sweetalert2";
import {Domain, JobName, System} from "../../../../../PST/classes/system-domain";
import {StructureService} from "../../../../services/structureServices/structure.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-job-name',
  templateUrl: './add-job-name.component.html',
  styleUrls: ['./add-job-name.component.scss']
})
export class AddJobNameComponent implements OnInit {

  tempJobName:JobName=new JobName();
  domain:Domain;
  constructor(public dialogRef: MatDialogRef<AddJobNameComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,) {

    if(this.data.jobName!=null){
      this.tempJobName=this.data.jobName;
    }
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.data.ref.loadDomainData();
    this.dialogRef.close();
  }



  addJobName(){
    let globalDTO:GlobalDTO =new GlobalDTO();
    this.tempJobName.type=GlobalType.JOBNAME
    globalDTO.domain=this.data.domain;
    globalDTO.jobName=this.tempJobName;
    globalDTO.type=GlobalType.JOBNAME
    this.structureServer.upsertDomainUnit(globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'Job Name Created successfully',
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
            text: 'Job Name Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
          this.data.ref.loadDomainData();
        }

    )
  }
}
