import { Component, OnInit } from '@angular/core';
import {
  ExpenseType,
  FinancialNumber,
  GlobalType, FinancialUnit,
  GlobalDTO,
  ManagerialUnit, ManagerialUnitDTO, PartialPO,
  PO,
  POType
} from "../../classes/managerialUnit";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureService} from "../../services/structureServices/structure.service";
import swal from "sweetalert2";
import {Vendor} from "../../../PST/classes/vendor";
import {VednorApisService} from "../../../PST/services/Vendor/VednorApis.service";
import {AddPartialPoComponent} from "../structure/entry-components/add-partial-po/add-partial-po.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-upsert-po',
  templateUrl: './upsert-po.component.html',
  styleUrls: ['./upsert-po.component.scss']
})
export class UpsertPoComponent implements OnInit {

  id: string;
  po:PO= new PO();
  managerialUnit:ManagerialUnit=new ManagerialUnit();
  isLoading:boolean=false
  poTypes=Object.values(POType);
  expenseTypes=Object.values(ExpenseType);
  vendors:Vendor[]=[];
  financialNumbers:FinancialNumber[]=[]
  globalDTO:GlobalDTO;
  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();

  constructor(
      private router: ActivatedRoute,
      public structureService:StructureService,
      public vendorApisService:VednorApisService,
      public route: Router,
      public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadPOData();
  }

  loadPOData(){
    this.po.managerialUnit=this.managerialUnit;
    this.id = this.router.snapshot.paramMap.get('id');
    if(this.id!=null && this.id.length>0){
      this.isLoading=true;
      let financialDTO:GlobalDTO=new GlobalDTO();
      let tempPO:PO = new PO();
      tempPO.type=GlobalType.PO
      tempPO.id=this.id;
      financialDTO.financialUnit=tempPO

      this.structureService.getFinancialUnit(financialDTO).subscribe(
          data=>{
            this.po=data as PO;
            this.fetchFinancialUnitsParentsAndFetchVendors();
          },
          err=>{},
          ()=>{this.isLoading=false}
      )

    }
  }
  fetchFinancialUnitsParentsAndFetchVendors(){
    this.managerialUnitDTO.childManagerialUnit=this.po.managerialUnit;
    this.structureService.getFinancialNumbersOfManagerialUnitParents(this.managerialUnitDTO).subscribe(
        (data)=>{
          console.log(data)
          this.globalDTO=data as GlobalDTO;
          this.financialNumbers=this.globalDTO.financialUnits;
        },
        (error)=> {},
    )

    this.vendorApisService.getAllVendors().subscribe(
        data=>{

          this.vendors=data;

          },
        error=>{}
    )
  }

  upsertFinancialNumber(){
    let globalDTO:GlobalDTO=new GlobalDTO();
    this.po.type=GlobalType.PO;
    globalDTO.type=GlobalType.PO;
    globalDTO.managerialUnit=this.po.managerialUnit;
    globalDTO.financialUnit=this.po;
    globalDTO.vendor=this.po.vendor;
    globalDTO.agreement=this.po.agreement;
    this.structureService.upsertFinancialUnit(globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'PO Updated successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.route.navigate(["/userService/listPO/"]);

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


  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  openAddPartialPODialog(po:PO) {
    let dialogRef = this.dialog.open(AddPartialPoComponent, {
      width: '60%',
      data: {ref:this,parentPO:po}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openEditPartialPODialog(po:PO,partialPO:FinancialUnit) {
    let dialogRef = this.dialog.open(AddPartialPoComponent, {
      width: '60%',
      data: {ref:this,parentPO:po,partialPO:partialPO}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
