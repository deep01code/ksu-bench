import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Department, GeneralDepartment, Section} from "../../classes/GeneralDepartment";
import {Vendor} from "../../classes/vendor";
import {Project} from "../../classes/project";
import {AttendanceException, Benefit, Employee} from "../../classes/employee";
import {Domain, System} from "../../classes/system-domain";
import {DataTableConfigService} from "../../../common-services/data-table-config/data-table-config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VednorApisService} from "../../services/Vendor/VednorApis.service";
import {LoVService} from "../../services/LoV/LoVService";
import {ProjectApiService} from "../../services/project/project-api.service";
import {SystemDomainService} from "../../services/system-domain/system-domain.service";
import {NgForm} from "@angular/forms";
import swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSelect} from "@angular/material";
import {EmployeeService} from "../../services/Employee/employee.service";
import {EditGeneralDepartment} from "../gd-management/gd-management.component";
import {Observable} from "rxjs/Observable";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {
  FinancialNumber, FinancialUnit, GlobalDTO,
  GlobalType,
  ManagerialUnit,
  ManagerialUnitDTO,
  PartialPO,
  PO
} from "../../../UserService/classes/managerialUnit";
import {environment} from "../../../../environments/environment";
import {StructureService} from "../../../UserService/services/structureServices/structure.service";
import {global} from "@angular/core/src/util";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './upsert-employee.component.html',
  styleUrls: ['./upsert-employee.component.scss']
})
export class UpsertEmployeeComponent implements OnInit {
  isLoading: boolean = false;
  //generalDepartments: GeneralDepartment[] = [];
  //vendors: Vendor[] = [];
 // projects: Project[];
  benefits:Benefit[]=[];
  employee: Employee=new Employee();
  employeeLogs:any[]=[];
  uploadType=["certificates","cvs","letters"];
  selecteduploadType:string=this.uploadType[0];
  selectedTabIndex=0

  //jobNames=[];
  //levels=[];
  //jobCategories=[];
  //domains=[];
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
  //systemDomains:System[];

  //tempDepartmentsList:Department[]=[];
  //tempSectionsList:Section[]=[];
  id: any;

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;


  /*Start After Refactor Fields*/
  units:any=null;
  selectedUnit:any;
  onInitUnit:any;
  public SERVER_URL: string = environment.serverUrl;
  pos:PO[]=[];
  domains:Domain[]=[];
  systemFilter:Domain;
  jobNameFilter:Domain;
  jobLevelFilter:Domain;
  tempZTree:any;
  clicked:boolean=true;
  /*End After Refactor Fields*/

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.empApi.upload(file,this.employee.id,this.selecteduploadType).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
          //  this.fileInfos = this.empApi.getFiles();
          }
        },
        err => {
          this.progressInfos[idx].value = 0;
          this.message = 'Could not upload the file:' + file.name;
        },
        ()=>{
          this.getEmployeeInfo(false)
        });
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  @ViewChild('financialTab') financialTab: ElementRef;

  @ViewChild("form") form: NgForm;

  financialTabClick() {
    console.log(document.getElementsByClassName('financialTab'))

    let el: HTMLElement=document.getElementsByClassName('financialTab')[0] as HTMLElement;
    el.click();
    //  this.financialTab.nativeElement.click();

  }
  addBenefit(type,amount,benefitDate){

    console.log(type)
    console.log(amount)

    let benefit:Benefit={
      benefitType: type,
      amount: amount,
      benefitDate:benefitDate,
      id:''
    };

    this.empApi.addBenefit(this.employee,benefit).subscribe((res)=>{
      this.employee.benefits.push(res)
      console.log(this.employee.benefits)
    })
  }

  removeBenefit(index){
    console.log(this.employee.benefits[index].id!="" &&
        this.employee.benefits[index].id)
    if(this.employee.benefits[index].id!="" &&
        this.employee.benefits[index].id
    ){
      console.log()
      this.empApi.deleteEmployeeBenefit(this.employee.benefits[index].id).subscribe((res)=>{
        console.log(res);
      });
    }
    this.employee.benefits.splice(index,1)
   // console.log(JSON.stringify(this.employee.benefits))

  }

  deleteAttendanceException(attendanceException:AttendanceException){
    let globalDTO=new GlobalDTO();
    globalDTO.employee=this.employee;
    globalDTO.attendanceException=attendanceException;

    this.empApi.deleteAttendance(globalDTO).subscribe((data)=>{window.location.reload();});
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
              public structureService:StructureService,
  ) {
    //get all GDs

    console.log("EditEmployeeComponent")


    this.systemFilter=new Domain();
    this.systemFilter.type=GlobalType.SYSTEM;

    this.jobNameFilter=new Domain();
    this.jobNameFilter.type=GlobalType.JOBNAME;

    this.jobLevelFilter=new Domain();
    this.jobLevelFilter.type=GlobalType.JOBLEVEL;

    this.id = this.router.snapshot.paramMap.get('id');
    /*if(this.id!='new'){

      this.getEmployeeInfo(true)
    }else {
      this.fetchxTree();
    }*/

    this.getEmployeeInfo(true);
/*
    this.empApi.getEmployee(this.id).subscribe((res:Employee)=>{
      this.employee=res;

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


      this.LovApi.getDepartmentByGeneralDepartmentID(this.employee.generalDepartment.id).subscribe((res) => {
        this.tempDepartmentsList = res;
      })
      this.LovApi.getSectionsByDepartmentID(this.employee.department.id).subscribe((res) => {
        this.tempSectionsList = res;
      })
      //get all companies
      this.vendorApi.getAllVendors().subscribe((res) => {
        this.vendors = res;
        console.log(res)
      })


    });
    this.LovApi.getGeneralDepartments().subscribe((res) => {
      this.generalDepartments = res;



    })

    this.LovApi.getDomains().subscribe((res)=>{ this.domains=res;    })
    this.LovApi.getJobNames().subscribe((res)=>{ this.jobNames=res})
    this.LovApi.getLevels().subscribe((res)=>{this.levels=res;})
    this.LovApi.getJobCategories().subscribe((res)=>{this.jobCategories=res;})

*/
    this.LovApi.getNationalities().subscribe( (res)=>{this.nationalityies=res;})

  }


  getEmployeeInfo(onInit:boolean){
    if(this.id!='new'){

      this.empApi.getEmployee(this.id).subscribe(
          data=>{
            let globalDTO:GlobalDTO=new GlobalDTO();
            // @ts-ignore
            globalDTO= data as GlobalDTO;

            this.employee=globalDTO.employee
            this.employee.employeeManagerialUnit=globalDTO.managerialUnit;
            if(onInit){
              this.selectedUnit=globalDTO.managerialUnit;
            }
            this.employee.employeeFinancialUnit=globalDTO.financialUnit;

            let  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
            managerialUnitDTO.childManagerialUnit=this.selectedUnit;

            this.fetchPOsAndDomains(managerialUnitDTO)
            this.fetchTree();

            this.empApi.getEmployeeLog(this.employee).subscribe(
                data=>{ this.employeeLogs=data as any[]}
            )
          },
          err=>{},
      )
    }else{ this.NewEmployeeFetchTree();}



  }

  ngOnInit() {




  }

  fetchPOsAndDomains(managerialUnitDTO){
    this.isLoading=true;
    this.structureService.getPosOfManagerialUnitParentsAndDomainsOfManagerialUnitParents(managerialUnitDTO).subscribe(
        data=>{
          let globalDTO:GlobalDTO= data as GlobalDTO;
          this.pos=globalDTO.pos;
          this.domains=globalDTO.domains;

        },

        error => {this.isLoading=false},
        ()=>{this.isLoading=false}
    )
  }


  addManagerialUnit(managerialUnit:ManagerialUnit){
    this.selectedUnit=managerialUnit;
  }
  removeManagerialUnit(managerialUnit:ManagerialUnit){
    this.selectedUnit=null;
  }

  checkIfUserHaveNode(root:any[]){

    if(this.selectedUnit){
      root.forEach( (node)=>{
        if(this.selectedUnit.id==node.id){
          node.checked=true;
          node.open=true;
        }else{ node.checked=false;}


        if(node.managerialUnits!=null){
          node.managerialUnits.forEach( unit =>{
            if(this.selectedUnit.id==unit.id){
              unit.checked=true;
              unit.open=true;
            }else{ unit.checked=false;}

            this.checkIfUserHaveNode(unit.managerialUnits);
          })
        }
      })



    }



  }

  //todo fix this
  /*openCheckedPath(root:any[],path:any[]){
    root.forEach( node =>{

      if(node.checked==true){
        path.forEach( parent =>{ parent.opened=true;})
        return;
      }

      if(node.managerialUnit!=null){
        path.push(node);
        node.managerialUnit.forEach( child =>{
          this.openCheckedPath(child,path);
        })
      }

    })


  }*/

  fetchTree(){
    var zNodes = [

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
         /* let  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
          managerialUnitDTO.childManagerialUnit=treeNode as ManagerialUnit;

          this.fetchPOsAndDomains(managerialUnitDTO)*/

          return (treeNode.click != false);
        },

        //todo fill
        onCheck: (event, treeId,treeNode)=>{


          if(treeNode.checked){
            this.addManagerialUnit(treeNode)
          }else{
            this.removeManagerialUnit(treeNode)
          }

          this.getEmployeeInfo(false)

        }
      },
      view:{showIcon:true},
      check: {
        enable: true,
        chkboxType:{Y:'',N:''}
      },
    };
    var promise = new Promise((resolve, reject) => {

      this.structureService.getUserUnitsTree().subscribe(
          (data)=>{
            // @ts-ignore
            zNodes=data;
            this.tempZTree=data;
            this.checkIfUserHaveNode(zNodes as any[])

            this.onInitUnit=data[0];
            zNodes.forEach( (item)=>{ item.open=true})
            //console.log(zNodes)

            $(document).ready(function(){
              zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
              //  zTreeObj.expandAll(false)
            });
            resolve();
          },

          err=>{},
          ()=>{ resolve();}

      );

    });


    return promise;
    //fetching zTree





  }

  NewEmployeeFetchTree(){
    this.fetchTree().then(res=>{
      var zNodes = this.tempZTree;
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
            /* let  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
             managerialUnitDTO.childManagerialUnit=treeNode as ManagerialUnit;

             this.fetchPOsAndDomains(managerialUnitDTO)*/

            return (treeNode.click != false);
          },

          //todo fill
          onCheck: (event, treeId,treeNode)=>{

            let  managerialUnitDTO:ManagerialUnitDTO=new ManagerialUnitDTO();
            managerialUnitDTO.childManagerialUnit=treeNode as ManagerialUnit;

            this.fetchPOsAndDomains(managerialUnitDTO)
            if(treeNode.checked){
              this.addManagerialUnit(treeNode)
            }else{
              this.removeManagerialUnit(treeNode)
            }

            this.getEmployeeInfo(false)

          }
        },
        view:{showIcon:true},
        check: {
          enable: true,
          chkboxType:{Y:'',N:''}
        },
      };


      this.checkIfUserHaveNode(zNodes as any[])

      zNodes.forEach( (item)=>{ item.open=true})
      //console.log(zNodes)

      $(document).ready(function(){
        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        //  zTreeObj.expandAll(false)
      });
    });
  }


  /*@ViewChild("department") departmentSelect: MatSelect;
  @ViewChild("section") sectionSelect: MatSelect;*/
  /*gdChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;
    if (this.form.controls.department) this.form.controls.department.reset();// = undefined;
    this.LovApi.getDepartmentByGeneralDepartmentID(this.employee.generalDepartment.id).subscribe((res) => {
      this.tempDepartmentsList = res;
    })
  }*/

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  compareObjectsWithName(o1: any, o2: any): boolean {
    return o1.name === o2.name;
  }
  /*departmentChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;
    this.LovApi.getSectionsByDepartmentID(this.employee.department.id).subscribe((res) => {
      this.tempSectionsList = res;
    })
  }
*/

  containsPO(pos:FinancialUnit[],po:FinancialUnit){
    let result:boolean =false;
      if(po!=null){pos.forEach( item=>{ if(item.id==po.id){result=true;}})}
    return result;
  }
  submitForm() {
    let self = this;
    let globalDTO:GlobalDTO=new GlobalDTO();

    globalDTO.employee=this.employee;
    globalDTO.managerialUnit=this.selectedUnit;
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
     /*   console.log('line 217')
        self.isLoading = true;
        console.log('line 219')
        let employee:Employee= new Employee();
        console.log('line 211')
        console.log(self.form.controls.employeeEnglishName.value);
        /!*         employee.employeeEnglishName= self.form.controls.employeeEnglishName.value;
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
                employee.skills= self.form.controls.skills.value; *!/
        employee = self.form.value;
        employee.benefits = self.benefits;
        //employee.certificates: String[]; // files attachment start
        //employee.cvs: String[];
        //employee.letters: String[];// files attachment end
        //  employee.dailyRate= self.form.controls.dailyRate.value;
        // employee.benefits:Benefit[]; // salary information end
        employee.project= self.form.controls.project.value;
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

        console.log('line 271')

        console.log(employee);*/
        self.empApi.createEmployee(globalDTO).subscribe(res => {
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'An employee has been added successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          self.route.navigate(["/"])
        }, (err) => {
          self.isLoading = false;
          swal({
            title: 'Error!',
            text: 'Error! not able to add employee',
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        });

      }catch (err){
        console.log(err)
      }

    }).catch(swal.noop);
  }



  openAddBenefitDialog() {
      let dialogRef = this.dialog.open(AddBenefits, {
        width: '60%',
        data: {employee:this.employee}
      });

      dialogRef.afterClosed().subscribe(result => {

      });
    }


  openAddAttendanceExceptionDialog() {
    let dialogRef = this.dialog.open(UpsertAttendance, {
      width: '60%',
      data: {employee:this.employee}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  updateSelectType(newType){
    console.log(newType);
    this.selecteduploadType=newType;
  }


  updateIsStcEmployee(stcEmployee: boolean) {
    this.employee.stcEmployee =stcEmployee
  }


  replaceCommaLineSate() {
    var strMessage1 = document.getElementById("state") ;
    strMessage1.innerHTML = strMessage1.innerHTML.replace( /aaaaaa./g,'<a href=\"http://www.google.com/').replace( /.bbbbbb/g,'/world\">Helloworld</a>') ;

  }


}







@Component({
  selector: 'add-benefits',
  templateUrl: 'add-benefits.html',
})
export class AddBenefits{

  employee:Employee= new Employee();
  tempBenefit:Benefit=new Benefit();
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
  constructor(public dialogRef: MatDialogRef<AddBenefits>,
              public empApi:EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee=this.data.employee;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addBenefit(){
    let benefit:Benefit={
      benefitType: this.tempBenefit.benefitType,
      amount: this.tempBenefit.amount,
      benefitDate:this.tempBenefit.benefitDate,
      id:''
    };

    this.empApi.addBenefit(this.employee,benefit).subscribe((res)=>{
      this.data.employee.benefits.push(res)
    })
  }



}





@Component({
  selector: 'upsert-attendance',
  templateUrl: 'upsert-attendance.html',
})
export class UpsertAttendance{

  employee:Employee= new Employee();
  tempAttendanceException:AttendanceException=new AttendanceException();

  constructor(public dialogRef: MatDialogRef<AddBenefits>,
              public empApi:EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee=this.data.employee;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  upsertAttendanceException(){

    let global = new GlobalDTO();
    global.employee=this.employee;
    global.attendanceException=this.tempAttendanceException;

    this.empApi.upsertAttendance(global).subscribe((res)=>{
      window.location.reload();
    })
  }



}