import {Component, Inject, OnInit} from '@angular/core';
import {StructureService} from "../../../../services/structureServices/structure.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {
  Agreement,
  ExpenseType,
  FinancialNumber, GlobalType, GlobalDTO,
  ManagerialUnit,
  ManagerialUnitDTO, PartialPO,
  PO,
  POType
} from "../../../../classes/managerialUnit";
import {Vendor} from "../../../../../PST/classes/vendor";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-add-partial-po',
  templateUrl: './add-partial-po.component.html',
  styleUrls: ['./add-partial-po.component.scss']
})
export class AddPartialPoComponent implements OnInit {


  tempPartialPO:PartialPO=new PartialPO();

  parentPO:PO=new PO();

  unit:ManagerialUnit;
//  financialNumbers:FinancialNumber[]=[]
//  selectedFinancialNumber:FinancialNumber;

  vendors:Vendor[]=[];
  selectedVendor:Vendor;

  agreements:Agreement[]=[];
  selectedAgreement:Agreement;

  poTypes=Object.values(POType);
  expenseTypes=Object.values(ExpenseType);

  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
  globalDTO:GlobalDTO=new GlobalDTO();

  isEditView:boolean=false;
  constructor(public dialogRef: MatDialogRef<AddPartialPoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public vednorApisService:VednorApisService
  ) {






    this.tempPartialPO.financialParent=this.data.parentPO;


    this.vednorApisService.getAllVendors().subscribe(
        data=>{ this.vendors=data;},
        error=>{}
    )
    if(this.data.partialPO){
      //this.isEditView=true;
      this.tempPartialPO=this.data.partialPO;
    }


  }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  addOrEditPartialPO(){

    this.tempPartialPO.type=GlobalType.PARTIALPO;
    this.globalDTO.type=GlobalType.PARTIALPO;
    this.globalDTO.financialUnit=this.tempPartialPO;
    this.globalDTO.managerialUnit=this.data.parentPO.managerialUnit;;
    this.globalDTO.agreement=this.tempPartialPO.agreement;
    this.globalDTO.vendor=this.tempPartialPO.vendor;
    this.globalDTO.financialParent=this.data.parentPO;
    this.structureServer.upsertFinancialUnit(this.globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'Partial PO Created successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.data.ref.loadPOData();
          this.dialogRef.close();
        },
        (err)=>{
          console.log(err);
          swal({
            title: 'Error',
            text: 'Partial PO Information Duplicated',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
        }

    )
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}
