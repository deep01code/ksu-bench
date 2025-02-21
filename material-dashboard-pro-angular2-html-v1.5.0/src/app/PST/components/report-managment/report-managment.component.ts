import { Component, OnInit } from '@angular/core';
import {Vendor} from "../../classes/vendor";
import {VednorApisService} from "../../services/Vendor/VednorApis.service";
import swal from "sweetalert2";
import {ReportFilterDataDTO} from "../../classes/ReportFilterDataDTO";
import {VendorDTO} from "../../classes/vendorDTO";
import {environment} from "../../../../environments/environment";
import {Employee} from "../../classes/employee";
import {EmployeeService} from "../../services/Employee/employee.service";
import {GammaLoginService} from "../../../services/gamma-login/gamma-login.service";
import {ManagerialUnit} from "../../../UserService/classes/managerialUnit";

@Component({
  selector: 'app-report-managment',
  templateUrl: './report-managment.component.html',
  styleUrls: ['./report-managment.component.scss']
})
export class ReportManagmentComponent implements OnInit {

  vendors: Vendor[] = null;
  selectorVendor:Vendor;
  reportFilterDataDTO:ReportFilterDataDTO=new ReportFilterDataDTO();
  managerialUnitList: ManagerialUnit[]=[];
  vendorList: VendorDTO[]=[];
  genderList: String[]=[];
  jobCategoryList: String[]=[];
  jobNameList: String[]=[];
  nationalityList: String[]=[];
  workingTypeList: String[]=[];
  buildingList: String[]=[];
  /*table attributes*/
  public SERVER_URL: string = environment.serverUrl;
  employees: Employee[]=[];
  pageSizeArray=[10,20,50,100];
  selectedPageSize=this.pageSizeArray[0];
  isLoading:boolean=false;
  pagingObject:any
  search:string;
  /*select all checkboxs*/
  toggleManagerialUnit: boolean = false;
  toggleVendor: boolean = false;
  toggleGender: boolean = false;
  toggleJobCategory: boolean = false;
  toggleJobName: boolean = false;
  toggleNationality: boolean = false;
  toggleWorkingType: boolean = false;
  toggleBuilding: boolean = false;
  /*total number*/
  totalNumberOfEmployees:any;

  /*Report Fields*/
  /*
  nationality
  jobName
  jobCategory
  workingType
  level
  domain
  */
  /*reportFields: String[]=[
      'employeeEnglishName','employeeArabicName','employeeNumber','employeeId','nationality','vendor','gender','maritalStatus','numberofSponsors',
    'numberofChild','startDate','endDate','stcEmail','personalEmail','section','building','floor','desk','jobName','jobCategory','workingType'
    ,'systemDomains','domain','level','ps','skills','basic','housing','transportation','employeeGOSI','companyGOSI','employeeSalary','totalSalary','medical',
    'endOfService','iqamaRenewal','governmentFees','ajeerFees','dailyRate','benefits','project','generalDepartment','department']*/
  reportFields: String[]=[
    "id",
    "employeeEnglishName",
    "employeeArabicName",
    "employeeNumber",
    "employeeId",
    "nationality",
    "phoneNumber",
    "gender",
    "maritalStatus",
    "stcEmployee",
    "numberofSponsors",
    "numberofChild",
    "startDate",
    "endDate",
    "dob",
    "stcEmail",
    "personalEmail",
    "building",
    "floor",
    "desk",
    "workingType",
    "skills",
    "certificates",
    "cvs",
    "letters",
    "basic",
    "housing",
    "transportation",
    "employeeGOSI",
    "companyGOSI",
    "employeeSalary",
    "totalSalary",
    "medical",
    "endOfService",
    "iqamaRenewal",
    "ajeerFees",
    "dailyRate",
    "benefits",
    "employeeManagerialUnit",
    "employeeFinancialUnit",
    "domain",
    "system",
    "jobName",
    "jobLevel",
  ]
  reportFieldsList: String[]=[];
  toogleReportFields : boolean = false;

  changeCamelCaseToNormal(text){
    let result = text.replace( /([A-Z])/g, " $1" ).replaceAll("_"," ");
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }


  constructor(
      public empApi: EmployeeService,
      private api: VednorApisService,
      public auth:GammaLoginService,
      ) {
   /* this.api.getAllVendors().subscribe((res) => {
      this.vendors = res;
      this.selectorVendor=this.vendors[0];
    }, (err) => {
      swal({
        type: 'error',
        title: 'Error!',
        text: 'Not able to fetch vendors, please contact admin team.',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    })*/



    this.api.getReportFilterDataDTO().subscribe((res) => {
      this.reportFilterDataDTO = res;

    }, (err) => {
      swal({
        type: 'error',
        title: 'Error!',
        text: 'Not able to fetch vendors, please contact admin team.',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    })



  }

  ngOnInit() {
  }




  searchFilter(){

    if(this.managerialUnitList && this.managerialUnitList.length<1){
      swal({
        title: 'Error!',
        text: 'Please Select at least one Managerial Unit',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    }
    else{
      let self=this;
      $('#pagination-container').pagination({
        dataSource:this.SERVER_URL+'/filter-employees',
        pageSize: self.selectedPageSize,
        showPrevious: false,
        showNext: false,
        locator:'employees',

        totalNumberLocator:function(response){
          self.totalNumberOfEmployees=response.resultTotalCount;
          return response.resultTotalCount;},
        alias: {
          pageNumber: 'page',
          pageSize: 'size',

        },
        ajax: {
          beforeSend: function() {
            self.isLoading=true;
          },
          dataType: 'json',
          type: 'post',
          contentType: 'application/json',
          data:JSON.stringify({

            managerialUnitList: self.managerialUnitList,
            vendorList: self.vendorList,
            genderList: self.genderList,
            jobCategoryList: self.jobCategoryList,
            jobNameList: self.jobNameList,
            nationalityList: self.nationalityList,
            workingTypeList: self.workingTypeList,
            buildingList: self.buildingList,

          }),
        },
        callback: function(data, pagination) {
          self.isLoading=false;
          self.employees = data;
        }


      })

    }




  }



/*  updateSelectedVendor(){
    console.log(this.selectorVendor)
  }*/

  generateReport(){

    if(this.reportFieldsList.length<1 &&this.managerialUnitList || this.managerialUnitList.length<1 ){
      swal({
        title: 'Error!',
        text: 'Please Select at least one Managerial Unit and at least one report field ',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    }else{
      this.isLoading=true;
      var reportFilterDataDTO= new ReportFilterDataDTO();
      reportFilterDataDTO.managerialUnitList= this.managerialUnitList,
          reportFilterDataDTO.vendorList= this.vendorList,
          reportFilterDataDTO.genderList= this.genderList,
          reportFilterDataDTO.jobCategoryList= this.jobCategoryList,
          reportFilterDataDTO.jobNameList= this.jobNameList,
          reportFilterDataDTO.nationalityList= this.nationalityList,
          reportFilterDataDTO.workingTypeList= this.workingTypeList,
          reportFilterDataDTO.buildingList= this.buildingList,
          reportFilterDataDTO.reportFieldsList=this.reportFieldsList;
          this.api.getReport(reportFilterDataDTO).subscribe(()=>{},()=>{},()=>{this.isLoading=false});
    }

  }

  downloadFile(data: Response) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  reload(){
    if(this.managerialUnitList && this.managerialUnitList.length<1){
      swal({
        title: 'Error!',
        text: 'Please Select at least one Managerial Unit',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    }
    else{
      let self=this;
      $('#pagination-container').pagination({
        dataSource:this.SERVER_URL+'/filter-employees',
        pageSize: self.selectedPageSize,
        showPrevious: false,
        showNext: false,
        locator:'employees',

        totalNumberLocator:function(response){
          self.totalNumberOfEmployees=response.resultTotalCount;
          return response.resultTotalCount;},
        alias: {
          pageNumber: 'page',
          pageSize: 'size',

        },
        ajax: {
          beforeSend: function() {
            self.isLoading=true;
          },
          dataType: 'json',
          type: 'post',
          contentType: 'application/json',
          data:JSON.stringify({

            managerialUnitList: self.managerialUnitList,
            vendorList: self.vendorList,
            genderList: self.genderList,
            jobCategoryList: self.jobCategoryList,
            jobNameList: self.jobNameList,
            nationalityList: self.nationalityList,
            workingTypeList: self.workingTypeList,
            buildingList: self.buildingList,

          }),
        },
        callback: function(data, pagination) {
          self.isLoading=false;
          self.employees = data;
        }


      })

    }
     }


     /*:ReportFilterDataDTO=new ReportFilterDataDTO();
  managerialUnitList: String[]=[];
  vendorList: VendorDTO[]=[];
  genderList: String[]=[];
  jobCategoryList: String[]=[];
  jobNameList: String[]=[];
  nationalityList: String[]=[];
  workingTypeList: String[]=[];
  buildingList: String[]=[];*/
  toggleManagerialUnitFunction(event){
  if(event){
    this.managerialUnitList=this.reportFilterDataDTO.managerialUnitList;
  }else{
    this.managerialUnitList=[]
  }
}
  toggleVendorFunction(event){
    if(event){
     this.vendorList=this.reportFilterDataDTO.vendorList;
  }else{
    this.vendorList=[];
  }
  }

  toggleGenderFunction(event){
    if(event){
    this.genderList=this.reportFilterDataDTO.genderList;
  }else{
    this.genderList=[]
  }
  }

  toggleJobCategoryFunction(event){
    if(event){
    this.jobCategoryList=this.reportFilterDataDTO.jobCategoryList;
  }else{
    this.jobCategoryList=[]
  }
  }
  toggleJobNameFunction(event){
    if(event){
      this.jobNameList=this.reportFilterDataDTO.jobNameList;
  }else{
      this.jobNameList=[]
  }
  }
  toggleNationalityFunction(event){
    if(event){
      this.nationalityList=this.reportFilterDataDTO.nationalityList;
  }else{
      this.nationalityList=[]
  }
  }
  toggleWorkingTypeFunction(event){
    if(event){
      this.workingTypeList=this.reportFilterDataDTO.workingTypeList;
  }else{
      this.workingTypeList=[]
  }
  }
  toggleBuildingFunction(event){
    if(event){
      this.buildingList=this.reportFilterDataDTO.buildingList;
  }else{
      this.buildingList=[]
  }
  }

  toggleReportFieldsFunction(event){
    if(event){
      this.reportFieldsList=this.reportFields;
    }else{
      this.reportFieldsList=[]
    }
  }
}
