import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ManagerialUnitDTO, ManagerialUnit, UnityType} from "../../../../classes/managerialUnit";
import {StructureService} from "../../../../services/structureServices/structure.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.scss']
})
export class AddSectorComponent implements OnInit {
   tempUnit:ManagerialUnit=new ManagerialUnit();
   unitParent:ManagerialUnit;
  constructor(public dialogRef: MatDialogRef<AddSectorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              ) {

      this.unitParent=data.unitParent;
      this.tempUnit.unitParent=this.unitParent;
  }

  ngOnInit() {
  }

  addManagerialUnit(){

      if(this.unitParent==null){
          this.tempUnit.type=UnityType.SECTOR;
      }else {
          switch (this.unitParent.type){
              case UnityType.SECTOR:{ this.tempUnit.type=UnityType.GENERAL_DEPARTMENT; break;}
              case UnityType.GENERAL_DEPARTMENT:{ this.tempUnit.type=UnityType.DEPARTMENT; break;}
              case UnityType.DEPARTMENT:{ this.tempUnit.type=UnityType.SECTION; break;}
              /*case UnityType.SECTION:{ this.tempUnit.type=UnityType.SECTION; break;}*/
          }
      }

      let addManagerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
      addManagerialUnitDTO.childManagerialUnit=this.tempUnit;
      addManagerialUnitDTO.parentManagerialUnit=this.unitParent;
      this.structureServer.createManagerialUnit(addManagerialUnitDTO).subscribe(
        (data)=>{
                 swal({
            title: 'Done!',
            text: 'Managerial Unit Created successfully',
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
            text: 'Managerial Unit Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
             }

    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 getModalTitle(unityType: UnityType){
     var text="";
      switch (unityType){
          case UnityType.SECTOR:{ text="General Department"; break; }
          case UnityType.GENERAL_DEPARTMENT:{ text="Department"; break;}
          case UnityType.DEPARTMENT:{ text="Section"; break;}
          case UnityType.SECTION:{ break;}
      }
     return text;
    }
}
