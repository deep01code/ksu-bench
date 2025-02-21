import { Vendor } from './../../../classes/vendor';
import { VednorApisService } from './../../../services/Vendor/VednorApis.service';
import {Department, GeneralDepartment, Section} from './../../../classes/GeneralDepartment';
import { EmployeeService } from '../../../services/Employee/employee.service';
import { LoVService } from '../../../services/LoV/LoVService';
import { DataTableConfigService } from '../../../../common-services/data-table-config/data-table-config.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import {MatDialog, MatSelect} from '@angular/material';
import {Project} from "../../../classes/project";
import {ProjectApiService} from "../../../services/project/project-api.service";
import {Benefit, Employee} from "../../../classes/employee";
import {System} from "../../../classes/system-domain";
import {SystemDomainService} from "../../../services/system-domain/system-domain.service";

@Component({
  selector: 'app-CreateEmployee',
  templateUrl: './EmployeeDetails.component.html',
  styleUrls: ['./EmployeeDetails.component.scss'],
  providers: [LoVService, EmployeeService]
})
export class EmployeeDetailsComponent implements OnInit {
  isLoading: boolean = false;
  generalDepartments: GeneralDepartment[] = [];
  vendors: Vendor[] = [];
  projects: Project[];
  benefits:Benefit[]=[];
  employee: Employee=new Employee();

  jobNames=[];
  levels=[];
  jobCategories=[];
  domains=[];
  nationalityies=[];

  workingTypes:Object[]=[
    {name:'Onsite',value:'ONSITE'},
    {name:'Offshore',value:'OFFSHORE'}
  ];

  benefitList:Object[]=[
    {name:'General',value:'TICKETS'},
    {name:'Business Trip',value:'BUSINESS_TRIP'},
    {name:'Overtime',value:'OVERTIME'},
    {name:'Vacation',value:'VACATION'},
    {name:'Iqama Exit Re-entry',value:'IQAMA_EXIT_RE_ENTRY'},
    {name:'Transfer Iqama',value:'TRANSFER_IQAMA'},
    {name:'Old  End of Service',value:'OLD_END_OF_SERVICE'},
    {name:'Other Benefits 1',value:'OTHER_BENEFITS_1'},
    {name:'Other Benefits 2',value:'OTHER_BENEFITS_2'}
  ];
  systemDomains:System[];

  @ViewChild('financialTab') financialTab: ElementRef;

  financialTabClick() {
    console.log(document.getElementsByClassName('financialTab'))

    let el: HTMLElement=document.getElementsByClassName('financialTab')[0] as HTMLElement;
    el.click();
    //  this.financialTab.nativeElement.click();

  }

/*
  addBenefit(type,amount){

    console.log(type)
    console.log(amount)

    let benefit:Benefit={
      benefitType: type,
      amount: amount,

      id:''
    };

    this.benefits.push(benefit)
    console.log(this.benefits)
  }
*/

  removeBenefit(index){
    this.benefits.splice(index,1);
  }

  calculateSalary(){
    try{
      this.form.controls.housing.setValue(this.form.controls.basic.value*0.25);
      this.form.controls['transportation'].setValue(this.form.controls.basic.value*0.1);
      this.form.controls['employeeGOSI'].setValue((this.form.controls.nationality.value=='Saudi') ? ((this.form.controls.basic.value+this.form.controls.housing.value)*0.1) : 0.0);
      this.form.controls['companyGOSI'].setValue((this.form.controls.nationality.value=='Saudi')? ((this.form.controls.basic.value+this.form.controls.housing.value)*0.12) : (this.form.controls.basic.value+this.form.controls.housing.value)*0.02 );
      this.form.controls['employeeSalary'].setValue((this.form.controls.nationality.value=='Saudi')? (this.form.controls.basic.value+this.form.controls.housing.value+this.form.controls.transportation.value-this.form.controls.employeeGOSI.value) : (this.form.controls.basic.value+this.form.controls.housing.value+this.form.controls.transportation.value));
      this.form.controls['totalSalary'].setValue(this.form.controls.basic.value+this.form.controls.housing.value+this.form.controls.transportation.value+this.form.controls.employeeGOSI.value+this.form.controls.companyGOSI.value) ;



    }catch (error){
      console.log(error);
    }
  }

  /*
  *
  constructor(private api: ProjectApiService, private route: Router) {
  }

  ngOnInit() {
    this.api.setProject(null);
    this.api.getAllProjects().subscribe((res) => {
      this.projects = res;
    }, (err) => {

    })
  }
  * */
  constructor(private config: DataTableConfigService,
              private route: Router,
              private vendorApi: VednorApisService,
              private LovApi: LoVService,
              private empApi: EmployeeService,
              private projectApiService: ProjectApiService,
              private systemDomainApi: SystemDomainService,
              private router: ActivatedRoute,
              public dialog: MatDialog,
  ) {
    //get all GDs
    this.LovApi.getGeneralDepartments().subscribe((res) => {
      this.generalDepartments = res;
    })
    //get all companies
    this.vendorApi.getAllVendors().subscribe((res) => {
      this.vendors = res;
      console.log(res)
    })


    this.LovApi.getDomains().subscribe((res)=>{ this.domains=res;    })
    this.LovApi.getJobNames().subscribe((res)=>{ this.jobNames=res})
    this.LovApi.getLevels().subscribe((res)=>{this.levels=res;})
    this.LovApi.getJobCategories().subscribe((res)=>{this.jobCategories=res;})
    this.LovApi.getNationalities().subscribe( (res)=>{this.nationalityies=res;})

  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  ngOnInit() {


    //system domain http

    this.systemDomainApi.getSystemDomains().subscribe((res) => {
      this.systemDomains = res;
    }, (err) => {})


    this.projectApiService.getAllProjects().subscribe((res) => {
      this.projects = res;
    }, (err) => {})


    this.vendorApi.getAllVendors().subscribe((res) => {
      this.vendors = res;
    }, (err) => {

    })
  }

  @ViewChild("department") departmentSelect: MatSelect;
  @ViewChild("section") sectionSelect: MatSelect;
  gdChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;
    if (this.form.controls.department) this.form.controls.department.reset();// = undefined;
  }

  departmentChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;

  }

  @ViewChild("form") form: NgForm;

  submitForm() {
    let self = this;
    swal({
      title: 'Confirmation',
      text: 'Are you sure you want to create this employee?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Add Employee!',
      buttonsStyling: false
    }).then(function () {

      try{
        console.log('line 217')
        self.isLoading = true;
        console.log('line 219')
        let employee:Employee= new Employee();
        console.log('line 211')
        console.log(self.form.controls.employeeEnglishName.value);
        /*         employee.employeeEnglishName= self.form.controls.employeeEnglishName.value;
                console.log('line 224')
                employee.employeeArabicName= self.form.controls.employeeArabicName.value;
                employee.employeeNumber= self.form.controls.employeeNumber.value;
                employee.employeeId= self.form.controls.employeeId.value;
                employee.nationality= self.form.controls.nationality.value;
                employee.vendor= self.form.controls.vendor.value;
                employee.gender= self.form.controls.gender.value;
                employee.maritalStatus= self.form.controls.maritalStatus.value;
                employee.numberofSponsors= self.form.controls.numberofSponsors.value;
                employee.numberofChild= self.form.controls.numberofChild.value;
                employee.startDate=self.form.controls.startDate.value;
                employee.endDate=self.form.controls.endDate.value;
                employee.stcEmail= self.form.controls.stcEmail.value;
                employee.personalEmail= self.form.controls.personalEmail.value;
                employee.generalDepartment= self.form.controls.gd.value;
                employee.department=self.form.controls.department.value;
                employee.section=self.form.controls.section.value;
                employee.building= self.form.controls.building.value;
                employee.floor= self.form.controls.floor.value;
                employee.desk= self.form.controls.desk.value;
                employee.jobName= self.form.controls.jobName.value;
                employee.jobCategory= self.form.controls.jobCategory.value;
                employee.workingType= self.form.controls.workingType.value;
                employee.systemDomains= self.form.controls.systemDomains.value;
                employee.domain= self.form.controls.domain.value;
                employee.level= self.form.controls.level.value;
                employee.ps= self.form.controls.ps.value;
                employee.skills= self.form.controls.skills.value; */
        employee = self.form.value;
        employee.startDate=self.form.controls.startDate.value;
        employee.endDate=self.form.controls.endDate.value;
        console.log('start date ==>'+self.form.controls.startDate.value);
        employee.benefits = self.benefits;
        //employee.certificates: String[]; // files attachment start
        //employee.cvs: String[];
        //employee.letters: String[];// files attachment end
        //  employee.dailyRate= self.form.controls.dailyRate.value;
        // employee.benefits:Benefit[]; // salary information end
       /* employee.project= self.form.controls.project.value;
        if(employee.project.projectType=='Projection'){
          employee.basic= self.form.controls.basic.value;/// salary information start
          employee.housing= self.form.controls.housing.value;
          employee.transportation= self.form.controls.transportation.value;
          employee.employeeGOSI= self.form.controls.employeeGOSI.value;
          employee.companyGOSI= self.form.controls.companyGOSI.value;
          employee.employeeSalary= self.form.controls.employeeSalary.value;
          employee.totalSalary= self.form.controls.totalSalary.value;
          employee.medical= self.form.controls.medical.value;
          employee.endOfService= self.form.controls.endOfService.value;
          employee.iqamaRenewal= self.form.controls.iqamaRenewal.value;
          employee.governmentFees= self.form.controls.governmentFees.value;
          employee.ajeerFees= self.form.controls.ajeerFees.value;
        }
        if(employee.project.projectType=='TM'){
          employee.basic= 0
          employee.housing= 0
          employee.transportation= 0
          employee.employeeGOSI= 0
          employee.companyGOSI= 0
          employee.employeeSalary= 0
          employee.totalSalary= 0
          employee.medical= 0
          employee.endOfService= 0
          employee.iqamaRenewal= 0
          employee.governmentFees= 0
          employee.ajeerFees= 0
          employee.dailyRate= self.form.controls.dailyRate.value;
        }
        if(employee.project.projectType=='MS' || employee.project.projectType=='Scope'){
          employee.basic= 0
          employee.housing= 0
          employee.transportation= 0
          employee.employeeGOSI= 0
          employee.companyGOSI= 0
          employee.employeeSalary= 0
          employee.totalSalary= 0
          employee.medical= 0
          employee.endOfService= 0
          employee.iqamaRenewal= 0
          employee.governmentFees= 0
          employee.ajeerFees= 0
          employee.dailyRate= 0
        }
*/
        console.log('line 271')

        console.log(employee);
        /*self.empApi.createEmployee(employee).subscribe(res => {
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'An employee has been added successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          self.route.navigate(["pst/employee"])
        }, (err) => {
          self.isLoading = false;
          swal({
            title: 'Error!',
            text: 'Error! not able to add employee',
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        });*/

      }catch (err){
        console.log(err)
      }

    }).catch(swal.noop);
  }


}

