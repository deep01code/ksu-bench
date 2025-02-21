import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Gam883Service} from '../gam883.service';
import swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import * as moment from "moment";


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
    @Output('outputProject') outputProject = new EventEmitter<any>();

  constructor(private api:Gam883Service,private cd:ChangeDetectorRef) { }

  projectForm = new FormGroup({
      projectName:new FormControl('',[Validators.required]),
      projectResponsible:new FormControl('',[Validators.required]),
      rolesCosts:new FormControl('',[Validators.required]),
      projectBudgets:new FormControl('',[Validators.required])
  });
    disableProjectNameField:boolean=false;

  //resposibles
    @ViewChild('responsibleForm') responsibleForm;
    responsibles=[];
    isNewResponsible:boolean=true;
    responsiblesDataSource = new MatTableDataSource(this.responsibles);
    resposiblesColumns = ['Type','Name','Email','phone No'];
    updateResponsible;


  //billing roles
    @ViewChild('billingRoleForm') billingRoleForm;
  billingRoles=[];
  isNewBillingRole:boolean=true;
  billingRolesDataSource = new MatTableDataSource(this.billingRoles);
  billingRolesColumns = ['Role Name','Rate','Priority'];
  updateBillingRole;


  //budget
    @ViewChild('budgetForm') budgetForm;
  budgets=[];
    isNewBudget:boolean=true;
    budgetsDataSource = new MatTableDataSource(this.budgets);
    budgetColumns = ['Original','Current','start date','end date'];
    updateBudget;

  projectsNames;

  ngOnInit() {
      this.getProjectsNames();

      this.budgets = [{id:'1',original:11123,current:11123,startDate:new Date('04/12/2018'),endDate:new Date('05/15/2018')}];
      //this.updateBudget = this.budgets[0];
      this.responsibles = [{type:'Director',name:'Bander Aldawood',email:'bmdawood@stc.com.sa',number:'0502607591'}];
      this.billingRoles = [{roleName:'Arch1',rate:2340.65,priority:2}];
      this.budgetsDataSource = new MatTableDataSource(this.budgets);
      this.responsiblesDataSource = new MatTableDataSource(this.responsibles);
      this.billingRolesDataSource = new MatTableDataSource(this.billingRoles);
      this.cd.detectChanges();
  }

  getProjectsNames(){
      this.api.getProjectNamesFromRadianceDB().subscribe((projs)=>{
          this.projectsNames = projs;
      },(err)=>{
          swal('Error','could not load projects names!','error');
      })
  }

  submitProject(project){
      console.log(project);
      this.outputProject.emit(project);
  }

  budgetEvent($event){
      console.log($event);
      if (this.isNewBudget){
          this.budgets.push($event);
          this.budgetsDataSource = new MatTableDataSource(this.budgets);
      }
  }

  billingRoleEvent($event){
      console.log($event);
      if (this.isNewBillingRole) {
          for (let i = 0; i < this.billingRoles.length; i++) {
              if (this.billingRoles[i].name == $event.roleName) {
                  swal('Error', 'you already have this billing role!', 'error');
                  return;
              }
              if (this.billingRoles[i].priority == $event.priority) {
                  swal('Error', 'you can not have two billing roles with the same priority!', 'error');
                  return;
              }
          }
          this.billingRoles.push($event);
      }
      if (!this.isNewBillingRole){
          for (let i = 0; i < this.billingRoles.length; i++) {
              if (this.billingRoles[i].priority == $event.priority && !(this.billingRoles[i].name == $event.roleName)) {
                  swal('Error', 'you can not have two billing roles with the same priority!', 'error');
                  return;
              }
              if (this.billingRoles[i].roleName == $event.roleName) {
                  this.billingRoles[i].priority = $event.priority;
                  this.billingRoles[i].rate = $event.rate;
                  break;
              }
          }
      }

      this.billingRolesDataSource = new MatTableDataSource(this.billingRoles);
  }

  responsibleEvent($event){
      console.log($event);
  }

    selectResponsible(row){
      console.log(row);
      if (this.isNewResponsible){
          this.updateResponsible = null;
          return;
      }
      this.responsibleForm.responsibleForm.get('type').setValue(row.type);
      this.responsibleForm.responsibleForm.get('name').setValue(row.name);
      this.responsibleForm.responsibleForm.get('number').setValue(row.number);
      this.responsibleForm.responsibleForm.get('email').setValue(row.email);
    }

    selectBudget(row){
      console.log(row);
      if (this.isNewBudget){
          this.updateBudget = null;
          return;
      }
      this.budgetForm.budgetForm.get('id').setValue(row.id);
      this.budgetForm.budgetForm.get('original').setValue(row.original);
      this.budgetForm.budgetForm.get('current').setValue(row.current);
      this.budgetForm.budgetForm.get('startDate').setValue(row.startDate);
      this.budgetForm.budgetForm.get('endDate').setValue(row.endDate);
    }

    selectRoleCost(row){
      console.log(row);
      if (this.isNewBillingRole){
          this.updateBillingRole = null;
          return;
      }
      this.billingRoleForm.billingRoleForm.get('roleName').setValue(row.roleName);
      this.billingRoleForm.billingRoleForm.get('rate').setValue(row.rate);
      this.billingRoleForm.billingRoleForm.get('priority').setValue(row.priority);
    }

    toggleChange(field:string){
      if (field == 'responsible'){
            this.isNewResponsible = (!this.isNewResponsible);
            this.responsibleForm.responsibleForm.reset();
          return;
      }
      if (field == 'billingRole'){
          this.isNewBillingRole = (!this.isNewBillingRole);
          this.billingRoleForm.billingRoleForm.reset();
          return;
      }
      if (field == 'budget'){
          this.isNewBudget = (!this.isNewBudget);
          this.budgetForm.budgetForm.reset();
          return;
      }
    }

    resetAllForms(){
      this.projectForm.reset();
      this.disableProjectNameField=false;
      this.budgetForm.budgetForm.reset();
      this.budgetsDataSource = new MatTableDataSource();
      this.responsibleForm.responsibleForm.reset();
      this.responsiblesDataSource = new MatTableDataSource();
      this.billingRoleForm.billingRoleForm.reset();
      this.billingRolesDataSource = new MatTableDataSource();
    }

}
