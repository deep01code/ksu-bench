import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StructureService} from "../../services/structureServices/structure.service";
import {FinancialNumber, GlobalType, ManagerialUnit, PartialPO, PO, UnityType} from "../../classes/managerialUnit";
import {AddBenefits} from "../../../PST/components/edit-employee/upsert-employee.component";
import {MatDialog} from "@angular/material";
import {AddSectorComponent} from "./entry-components/add-sector/add-sector.component";
import {AddFinancialNumberComponent} from "./entry-components/add-financial-number/add-financial-number.component";
import {environment} from "../../../../environments/environment";
import {GammaLoginService} from "../../../services/gamma-login/gamma-login.service";
import {AddPoComponent} from "./entry-components/add-po/add-po.component";
import {Router} from "@angular/router";
import {AddDomainComponent} from "./entry-components/add-domain/add-domain.component";
import {Domain} from "../../../PST/classes/system-domain";
import {Employee} from "../../../PST/classes/employee";
import {AddEmployeeComponent} from "./entry-components/add-employee/add-employee.component";

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {

  isLoading:boolean=false;
  units:any=null;
  selectedUnit:any;
  onInitUnit:any;
  public SERVER_URL: string = environment.serverUrl;

  /*financialNumbers*/
  financialNumberPageSizeArray=[10,20,50,100];
  financialNumberSelectedPageSize=this.financialNumberPageSizeArray[0];
 // totalNumberOfFinancialNumbers:number;
  financialNumbers:FinancialNumber[]=[];
  pos:PO[]=[];
  partialPos:PartialPO[]=[];
  domains:Domain[]=[];
  employees:Employee[]=[]



  @ViewChild('systemDomains') firstTab: ElementRef;

  triggerFirstTabClick() {
    let el: HTMLElement = this.firstTab.nativeElement;
    el.click();
  }
  // zTree data attributes, refer to the API documentation (treeNode data details)
  constructor(public structureService:StructureService,
              public dialog: MatDialog,
              public auth:GammaLoginService,
              public route: Router,

  ) {

      this.fetchTree();
      setTimeout(()=>{this.triggerFirstTabClick()},500)
  }


  fetchTree(){
    var zNodes = [
      /*{name:"test1",value:"somevalue", open:true, children:[
          {name:"test1_1"}, {name:"test1_2"}]},
      {name:"test2", open:true, children:[
          {name:"test2_1"}, {name:"test2_2"}]}*/
    ];
    var zTreeObj;
    var setting = {
      data: {
        key: {
          title:"unitEnglishName",
          name:"unitEnglishName",
          children:"managerialUnits"
        },
        simpleData: {
          enable: true
        }
      },
      callback: {
        /*beforeClick: this.beforeClick,*/
        onClick: (event, treeId, treeNode, clickFlag) =>{
          //console.log("treeId==>"+treeId+" treeNore==>"+JSON.stringify(treeNode)+" clickFlage==>"+clickFlag+" event"+event);
          this.selectedUnit=treeNode as ManagerialUnit;

            this.loadPaginationTables();





          return (treeNode.click != false);
        }
      },
      view:{showIcon:true}
    };

    //fetching zTree
    this.isLoading=true;
    this.structureService.getAllManagerialUnits().subscribe(
        (data)=>{
      // @ts-ignore
      zNodes=data;
      this.onInitUnit=data[0];
      zNodes.forEach( (item)=>{ item.open=true})
      console.log(zNodes)
      $(document).ready(function(){
        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      //  zTreeObj.expandAll(false)
      });},

        err=>{},
        ()=>{this.isLoading=false;}

    );




  }



  public loadPaginationTables(){

    let financialSelector='#pagination-container'
    let financialPaginationUrl='/get-financial-units-per-managerial-unit'
    let financialLocator='financialNumbers'
    let financialPayload={
      childManagerialUnit: this.selectedUnit,
      type: GlobalType.FINANCIALNUMBER
    }

    let poSelector='#pos-container'
    let poPaginationUrl='/get-financial-units-per-managerial-unit'
    let polLocator='pos'
    let poPayload={
      childManagerialUnit: this.selectedUnit,
      type: GlobalType.PO
    }



    let domainsSelector='#domains-container'
    let domainsPaginationUrl='/get-domains-per-managerial-unit'
    let domainsLocator='domains'
    let domainsPayload={
      childManagerialUnit: this.selectedUnit,
     // type: FinancialType.PARTIALPO
    }

    //
    //
    let employeesSelector='#employees-container'
    let employeesPaginationUrl='/get-employees-per-managerial-unit'
    let employeesLocator='employees'
    let employeesPayload={
      childManagerialUnit: this.selectedUnit,
      type: GlobalType.EMPLOYEE
    }

    this.loadGenericPaginationTable(financialSelector,financialPaginationUrl,financialLocator,financialPayload,GlobalType.FINANCIALNUMBER)
    this.loadGenericPaginationTable(poSelector,poPaginationUrl,polLocator,poPayload,GlobalType.PO)
    this.loadGenericPaginationTable(domainsSelector,domainsPaginationUrl,domainsLocator,domainsPayload,GlobalType.DOMAIN)
    this.loadGenericPaginationTable(employeesSelector,employeesPaginationUrl,employeesLocator,employeesPayload,GlobalType.EMPLOYEE)

    //get-domains-per-managerial-unit
    //domains-container


  }

  public loadGenericPaginationTable(selector,url,locator,payload,type:GlobalType) {
    let self = this;

    $(selector).pagination({
      dataSource: this.SERVER_URL + url,
      pageSize: self.financialNumberSelectedPageSize,
      showPrevious: false,
      showNext: false,
      locator: locator,

      totalNumberLocator: function (response) {

      //  totalNumber = response.size;
      //  console.log("size ===> "+totalNumber)
        return response.size;
      },
      alias: {
        pageNumber: 'page',
        pageSize: 'size',

      },

      ajax: {
        beforeSend: function (request) {
          self.isLoading = true;
          request.setRequestHeader("Authorization", "bearer " + self.auth.getToken());

        },
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(payload),
      },
      formatAjaxError: function(jqXHR, textStatus, errorThrown) { self.isLoading=false;},
      callback: function (data, pagination) {
        self.isLoading = false;


        switch (type){
          case GlobalType.FINANCIALNUMBER:{self.financialNumbers=data;break;}
          case GlobalType.PO:{self.pos=data;break;}
          case GlobalType.PARTIALPO:{self.partialPos=data; break;}
          case GlobalType.DOMAIN:{self.domains=data; break;}
          case GlobalType.EMPLOYEE:{self.employees=data; break;}
        }
      }


    })
  }



  ngOnInit() {
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



  openAddManagerialUnitDialog(unitParent:ManagerialUnit) {
    let dialogRef = this.dialog.open(AddSectorComponent, {
      width: '60%',
      data: {ref:this,unitParent:unitParent}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddFinancialNumberDialog(unitParent:ManagerialUnit){
    let dialogRef = this.dialog.open(AddFinancialNumberComponent, {
      width: '60%',
      data: {ref:this,unitParent:unitParent}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddPODialog(unit:ManagerialUnit){

    let dialogRef = this.dialog.open(AddPoComponent, {
      width: '60%',
      data: {ref:this,unit:unit}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddDomainDialog(unitParent:ManagerialUnit){
    let dialogRef = this.dialog.open(AddDomainComponent, {
      width: '60%',
      data: {ref:this,unitParent:unitParent}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddEmployeeDialog(managerialUnit:ManagerialUnit){
    let dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '60%',
      data: {ref:this,managerialUnit:managerialUnit}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  UnityType(){
    return UnityType;
  }

  editFinancialNumber(id) {
    this.route.navigate(["/userService/upsertFin/" + id]);
  }
  editPO(id) {
    this.route.navigate(["/userService/upsertPO/" + id]);
  }
  editDomain(id) {
    this.route.navigate(["/userService/upsertDomain/" + id]);
  }
  editEmployee(id) {
    this.route.navigate(["/pst/edit-employee/" + id]);
  }







}




export enum Tabs{
  FIN,PO,PARTIALPO
}



