import { Employee } from '../../../classes/employee';
import { EmployeeService } from '../../../services/Employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { DataTableConfigService } from '../../../../common-services/data-table-config/data-table-config.service';
import {Project} from "../../../classes/project";
import {ProjectApiService} from "../../../services/project/project-api.service";
import {Router} from "@angular/router";
import { data } from 'jquery';
import {environment} from '../../../../../environments/environment';
import {GammaLoginService} from "../../../../services/gamma-login/gamma-login.service";
import swal from "sweetalert2";
@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss'],
  providers: [EmployeeService]
})
export class ViewEmployeesComponent implements OnInit {
  public SERVER_URL: string = environment.serverUrl;
  employees: Employee[]=[];
  pageSizeArray=[10,20,50,100];
  selectedPageSize=this.pageSizeArray[0];
  totalEmployeeNumber:number=0;
  isLoading:boolean=false;
  pagingObject:any
  search:string;
  fileToUpload: File | null = null;

  constructor(
      public empApi: EmployeeService,
      private config: DataTableConfigService,
      private route: Router,
      public auth:GammaLoginService
              ) {


    this.configuration.searchEnabled = true;
    this.configuration.horizontalScroll = true
  }

  ngOnInit() {


    this.empApi.getEmployeesCount().subscribe((res)=>{

      this.totalEmployeeNumber=res as number
      let self=this;
     $('#pagination-container').pagination({
        dataSource:this.SERVER_URL+'/employees',
        pageSize: self.selectedPageSize,
        showPrevious: false,
        showNext: false,
        locator:'employees',

       totalNumberLocator:function(response){return response.size;},
        alias: {
          pageNumber: 'page',
          pageSize: 'size'
        },
       ajax: {
         beforeSend: function(request) {
           self.isLoading=true;
           request.setRequestHeader("Authorization", "bearer " + self.auth.getToken());

         },
         data:{
           search:self.search,
          // username:self.auth.getUserName(),
           //Authorization: "Bearer " + self.auth.getToken()
         }
       },
       callback: function(data, pagination) {
         self.isLoading=false;
         self.employees = data;
       }


      })



    })


  }

  ngAftexrViewInit(){
  }


  eventEmitted(emp) {

  }
  public configuration = this.config.getConfig();
  public columns = [
    { title: "Employee Name", key: "employeeEnglishName" },
    { title: "Company Name", key: "company.companyName" },
    { title: "Employee number", key: "employeeNumberOrId" },
    { title: "Start Date", key: "startDate" },
    { title: "GD Name", key: "gdName" },
    { title: "Department Name", key: "departmentName" },
    { title: "Section Name", key: "sectionName" },
    { title: "Nationality", key: "nationality" },
    { title: "Email", key: "emailAddress" },
    { title: "Gender", key: "gender" },
    { title: "Level", key: "level" },
    { title: "Project Name", key: "projectName" },
    { title: "Project Number", key: "projectNumber" },
    { title: "isProjectionRelated", key: "projectionRelated" },
    { title: "Location", key: "location" },
    { title: "Job Title", key: "jobTitle" },
    { title: "Building", key: "building" },
    { title: "Floor", key: "floor" },
  ];

  addEmployee() {
    this.route.navigate(["/pst/employee/new"]);
  }

  editEmployee(id) {
    this.route.navigate(["/pst/edit-employee/" + id]);
  }


  reload(){
    console.log('===========>'+this.search)

    this.empApi.getEmployeesCount().subscribe((res)=>{

      this.totalEmployeeNumber=res as number
      let self=this;
      $('#pagination-container').pagination({
        dataSource:this.SERVER_URL+'/employees',
        pageSize: self.selectedPageSize,
        showPrevious: false,
        showNext: false,
        locator:'employees',

        totalNumberLocator:function(response){return response.size;},
        alias: {
          pageNumber: 'page',
          pageSize: 'size'
        },
        ajax: {
          beforeSend: function(request) {
            self.isLoading=true;
            request.setRequestHeader("Authorization", "bearer " + self.auth.getToken());
          },
          data:{
            search:self.search,
           // username:self.auth.getUserName()
          }
        },
        callback: function(data, pagination) {
          self.isLoading=false;
          self.employees = data;
        }


      })



    })
  }


  downloadEmployeeUploadTemplate(){
    this.empApi.downloadEmployeeUploadTemplate().subscribe(()=>{},()=>{},()=>{});
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.isLoading=true;
    this.empApi.postBulkEmployeeFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.isLoading=false;
      window.location.reload();
    }, error => {
      this.isLoading=false;
      swal({
        title: 'Error!',
        text: 'Some Vendor records was not updated, please check log page',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
      console.log(error);
    });
  }


}
