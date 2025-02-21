import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StructureService} from "../../services/structureServices/structure.service";
import {VednorApisService} from "../../../PST/services/Vendor/VednorApis.service";
import {MatDialog} from "@angular/material";
import {
  ExpenseType,
  FinancialNumber, GlobalType,
  GlobalDTO,
  ManagerialUnit,
  ManagerialUnitDTO,
  PO,
  POType, FinancialUnit
} from "../../classes/managerialUnit";
import {Vendor} from "../../../PST/classes/vendor";
import {Domain, JobLevel, JobName, System} from "../../../PST/classes/system-domain";
import swal from "sweetalert2";
import {AddPartialPoComponent} from "../structure/entry-components/add-partial-po/add-partial-po.component";
import {AddSystemComponent} from "../structure/entry-components/add-system/add-system.component";
import {AddJobNameComponent} from "../structure/entry-components/add-job-name/add-job-name.component";
import {AddJobLevelComponent} from "../structure/entry-components/add-job-level/add-job-level.component";

@Component({
  selector: 'app-upsert-domain',
  templateUrl: './upsert-domain.component.html',
  styleUrls: ['./upsert-domain.component.scss']
})
export class UpsertDomainComponent implements OnInit {

  id: string;
  domain:Domain;
  managerialUnit:ManagerialUnit=new ManagerialUnit();
  isLoading:boolean=false
  systems:System[]=[];
  jobNames:JobName[]=[];
  jobLevels:JobLevel[]=[];
  globalDTO:GlobalDTO;
  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();

  constructor(private router: ActivatedRoute,
              public structureService:StructureService,
              public vendorApisService:VednorApisService,
              public route: Router,
              public dialog: MatDialog,) { }

  ngOnInit() {
    this.loadDomainData();
  }


  loadDomainData(){
    this.id = this.router.snapshot.paramMap.get('id');
    if(this.id!=null && this.id.length>0){
      this.isLoading=true;
      let globalDTO:GlobalDTO=new GlobalDTO();
      let tempDomain:Domain = new Domain();
      tempDomain.type=GlobalType.DOMAIN
      tempDomain.id=this.id;
      globalDTO.domainBasicUnit=tempDomain

      this.structureService.getDomainUnit(globalDTO).subscribe(
          data=>{
            let globalDTO:GlobalDTO = data as GlobalDTO;
            this.domain=globalDTO.domainBasicUnit;
            this.systems=globalDTO.systems
            this.jobNames=globalDTO.jobNames;
            this.jobLevels=globalDTO.jobLevels;
            //this.fetchFinancialUnitsParentsAndFetchVendors();
          },
          err=>{},
          ()=>{this.isLoading=false}
      )

    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  upsertDomain(){
    let globalDTO:GlobalDTO=new GlobalDTO();
    this.domain.type=GlobalType.DOMAIN;
    globalDTO.type=GlobalType.DOMAIN;
    globalDTO.managerialUnit=this.domain.managerialUnit;
    globalDTO.domain=this.domain;
    //globalDTO.vendor=this.po.vendor;
    //globalDTO.agreement=this.po.agreement;
    this.structureService.upsertDomainUnit(globalDTO).subscribe(
        (data)=>{
          swal({
            title: 'Done!',
            text: 'Domain Updated successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.route.navigate(["/userService/listDomain/"]);

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

  openTapClick(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }



  openxAddPartialPODialog(po:PO) {
    let dialogRef = this.dialog.open(AddPartialPoComponent, {
      width: '60%',
      data: {ref:this,parentPO:po}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openxEditPartialPODialog(po:PO,partialPO:FinancialUnit) {
    let dialogRef = this.dialog.open(AddPartialPoComponent, {
      width: '60%',
      data: {ref:this,parentPO:po,partialPO:partialPO}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  openAddSystemDialog(domain:Domain,system:System){
    let dialogRef = this.dialog.open(AddSystemComponent, {
      width: '60%',
      data: {ref:this,domain:domain,system:system}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openAddJobNameDialog(domain:Domain,jobName:JobName){
    let dialogRef = this.dialog.open(AddJobNameComponent, {
      width: '60%',
      data: {ref:this,domain:domain,jobName:jobName}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openAddJobLevelDialog(domain:Domain,jobLevel:JobLevel){
    let dialogRef = this.dialog.open(AddJobLevelComponent, {
      width: '60%',
      data: {ref:this,domain:domain,jobLevel:jobLevel}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  editSystem(id){}
  editJobName(id){}

}
