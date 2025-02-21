import {Component, Inject, OnInit} from '@angular/core';
import {
  Agreement, ExpenseType,
  FinancialNumber,
  GlobalType,
  GlobalDTO,
  ManagerialUnit, ManagerialUnitDTO, PO, POType
} from "../../../../classes/managerialUnit";
import {StructureService} from "../../../../services/structureServices/structure.service";
import swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Vendor} from "../../../../../PST/classes/vendor";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrls: ['./add-po.component.scss']
})
export class AddPoComponent implements OnInit {

//  tempFinancialNumber:FinancialNumber=new FinancialNumber();

  tempPO:PO=new PO();

  unit:ManagerialUnit;
//Object.values(types);
  financialNumbers:FinancialNumber[]=[]
  selectedFinancialNumber:FinancialNumber;

  vendors:Vendor[]=[];
  selectedVendor:Vendor;

  agreements:Agreement[]=[];
  selectedAgreement:Agreement;

  poTypes=Object.values(POType);
  expenseTypes=Object.values(ExpenseType);

  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
  globalDTO:GlobalDTO;
  constructor(public dialogRef: MatDialogRef<AddPoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public vednorApisService:VednorApisService
  ) {

    this.unit=data.unit;
    this.managerialUnitDTO.childManagerialUnit=this.unit;
    this.structureServer.getFinancialNumbersOfManagerialUnitParents(this.managerialUnitDTO).subscribe(
        (data)=>{
          this.globalDTO=data as GlobalDTO;
          this.financialNumbers=this.globalDTO.financialUnits;
        },
        (error)=> {},
    )

    this.vednorApisService.getAllVendors().subscribe(
        data=>{ this.vendors=data;},
        error=>{}
    )


  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPO(){

    this.tempPO.type=GlobalType.PO;
    this.globalDTO.type=GlobalType.PO;
    this.globalDTO.financialUnit=this.tempPO;
    this.globalDTO.managerialUnit=this.unit;
    this.globalDTO.agreement=this.tempPO.agreement;
    this.globalDTO.vendor=this.tempPO.vendor;
    this.globalDTO.financialParent=this.tempPO.financialParent;
    this.structureServer.upsertFinancialUnit(this.globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'PO Created successfully',
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
            text: 'PO Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
        }

    )
  }

/*  addFinancialNumber(){
    let globalDTO:FinancialUnitDTO=new FinancialUnitDTO();
    globalDTO.managerialUnit=this.unitParent;
    globalDTO.financialUnit=this.tempFinancialNumber;
    this.structureServer.addFinancialNumber(globalDTO).subscribe(
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
  }*/

}
