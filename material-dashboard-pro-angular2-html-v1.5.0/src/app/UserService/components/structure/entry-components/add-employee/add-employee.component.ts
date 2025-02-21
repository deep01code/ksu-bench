import {Component, Inject, OnInit} from '@angular/core';
import {StructureService} from "../../../../services/structureServices/structure.service";
import {VednorApisService} from "../../../../../PST/services/Vendor/VednorApis.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Employee} from "../../../../../PST/classes/employee";
import {
  FinancialUnit,
  GlobalDTO,
  GlobalType,
  ManagerialUnit,
  ManagerialUnitDTO,
  PO
} from "../../../../classes/managerialUnit";
import {environment} from "../../../../../../environments/environment";
import {Domain} from "../../../../../PST/classes/system-domain";
import swal from "sweetalert2";
import {EmployeeService} from "../../../../../PST/services/Employee/employee.service";
import {LoVService} from "../../../../../PST/services/LoV/LoVService";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  globalDTO:GlobalDTO;
  employee:Employee=new Employee();
  managerialUnit:ManagerialUnit;


  workingTypes:Object[]=[
    {name:'Onsite',value:'ONSITE'},
    {name:'Offshore',value:'OFFSHORE'}
  ];
  public SERVER_URL: string = environment.serverUrl;
  pos:PO[]=[];
  domains:Domain[]=[];
  systemFilter:Domain;
  jobNameFilter:Domain;
  jobLevelFilter:Domain;
  nationalityies=[];


  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public structureServer:StructureService,
              public structureService:StructureService,
              private empApi: EmployeeService,
              private LovApi: LoVService,

              public vendorApisService:VednorApisService) {

    this.managerialUnit=data.managerialUnit;
    this.systemFilter=new Domain();
    this.systemFilter.type=GlobalType.SYSTEM;

    this.jobNameFilter=new Domain();
    this.jobNameFilter.type=GlobalType.JOBNAME;

    this.jobLevelFilter=new Domain();
    this.jobLevelFilter.type=GlobalType.JOBLEVEL;
    console.log(this.managerialUnit)
    let  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
    managerialUnitDTO.childManagerialUnit=this.managerialUnit;
    this.fetchPOsAndDomains(managerialUnitDTO)
    this.LovApi.getNationalities().subscribe( (res)=>{this.nationalityies=res;})
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateIsStcEmployee(stcEmployee: boolean) {
    this.employee.stcEmployee =stcEmployee
  }

  fetchPOsAndDomains(managerialUnitDTO){
     this.structureService.getPosOfManagerialUnitParentsAndDomainsOfManagerialUnitParents(managerialUnitDTO).subscribe(
        data=>{
          let globalDTO:GlobalDTO= data as GlobalDTO;
          this.pos=globalDTO.pos;
          this.domains=globalDTO.domains;

        },

        error => { },
        ()=>{ }
    )
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
  containsPO(pos:FinancialUnit[],po:FinancialUnit){
    let result:boolean =false;
    if(po!=null){pos.forEach( item=>{ if(item.id==po.id){result=true;}})}
    return result;
  }

  addEmployee() {
    let self = this;
    let globalDTO:GlobalDTO=new GlobalDTO();

    globalDTO.employee=this.employee;
    globalDTO.managerialUnit=this.managerialUnit;
    globalDTO.financialUnit=(this.containsPO(this.pos,this.employee.employeeFinancialUnit))?this.employee.employeeFinancialUnit:null;
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
         self.empApi.createEmployee(globalDTO).subscribe(res => {
           swal({
            title: 'Done!',
            text: 'An employee has been added successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
           self.data.ref.fetchTree();
           self.data.ref.loadPaginationTables();
           self.dialogRef.close();
        }, (err) => {
           swal({
            title: 'Error!',
            text: 'Error! not able to add employee',
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
           this.dialogRef.close();
        });

      }catch (err){
        console.log(err)
      }

    }).catch(swal.noop);
  }
}
