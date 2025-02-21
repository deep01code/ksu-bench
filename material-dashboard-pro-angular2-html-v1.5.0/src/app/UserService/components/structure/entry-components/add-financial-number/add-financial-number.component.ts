import {Component, Inject, OnInit} from '@angular/core';
import {FinancialNumber, GlobalType, GlobalDTO, ManagerialUnit} from "../../../../classes/managerialUnit";
import {StructureService} from "../../../../services/structureServices/structure.service";
import swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-financial-number',
  templateUrl: './add-financial-number.component.html',
  styleUrls: ['./add-financial-number.component.scss']
})
export class AddFinancialNumberComponent implements OnInit {

  tempFinancialNumber:FinancialNumber=new FinancialNumber();
  unitParent:ManagerialUnit;
  constructor(public dialogRef: MatDialogRef<AddFinancialNumberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
  ) {

    this.unitParent=data.unitParent;
/*
    this.tempFinancialNumber.managerialUnit=this.unitParent;
*/
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFinancialNumber(){
    let globalDTO:GlobalDTO=new GlobalDTO();
    this.tempFinancialNumber.type=GlobalType.FINANCIALNUMBER;
    globalDTO.type=GlobalType.FINANCIALNUMBER;
    globalDTO.managerialUnit=this.unitParent;
    globalDTO.financialUnit=this.tempFinancialNumber;
    this.structureServer.upsertFinancialUnit(globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'Financial Number Created successfully',
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
            text: 'Financial Number Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
        }

    )
  }

  /*  addManagerialUnit(){

      if(this.unitParent==null){
        this.tempUnit.type=UnityType.SECTOR;
      }else {
        switch (this.unitParent.type){
          case UnityType.SECTOR:{ this.tempUnit.type=UnityType.GENERAL_DEPARTMENT; break;}
          case UnityType.GENERAL_DEPARTMENT:{ this.tempUnit.type=UnityType.DEPARTMENT; break;}
          case UnityType.DEPARTMENT:{ this.tempUnit.type=UnityType.SECTION; break;}
            /!*case UnityType.SECTION:{ this.tempUnit.type=UnityType.SECTION; break;}*!/
        }
      }

      let addManagerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
      addManagerialUnitDTO.childManagerialUnit=this.tempUnit;
      addManagerialUnitDTO.parentManagerialUnit=this.unitParent;
      this.structureServer.createManagerialUnit(addManagerialUnitDTO).subscribe(
          (data)=>{
            swal({
              title: 'Done!',
              text: 'Sector Created successfully',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
            this.data.ref.fetchTree();
            this.dialogRef.close();
          },
          (err)=>{
            console.log(err);
            swal({
              title: 'Error',
              text: 'Sector Information Dublicated',
              type: 'error',
              confirmButtonClass: 'btn btn-danger',
              buttonsStyling: false
            });
          }

      )
    }*/
/*  getModalTitle(unityType: UnityType){
    var text="";
    switch (unityType){
      case UnityType.SECTOR:{ text="General Department"; break; }
      case UnityType.GENERAL_DEPARTMENT:{ text="Department"; break;}
      case UnityType.DEPARTMENT:{ text="Section"; break;}
      case UnityType.SECTION:{ break;}
    }
    return text;
  }*/

}
