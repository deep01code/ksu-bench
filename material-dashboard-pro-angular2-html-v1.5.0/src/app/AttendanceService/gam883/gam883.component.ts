import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Gam883Service} from './gam883.service';
import swal from 'sweetalert2';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-gam883',
  templateUrl: './gam883.component.html',
  styleUrls: ['./gam883.component.scss']
})
export class Gam883Component implements OnInit {
    isNew:boolean = true;
    @ViewChild('projectForm') projectForm;


    updateProject = {id:null,name:null};
    projects=[];
    projectsDataSource = new MatTableDataSource(this.projects);
    projectsColumns = ['Name','Current Budget','Director','Admin'];

  constructor(private api:Gam883Service,private cd:ChangeDetectorRef,private alert:AlertService) { }

  ngOnInit() {
      this.api.getProjects().subscribe((result)=>{
          this.projects = result.body;
          this.projectsDataSource = new MatTableDataSource(this.projects);
          this.cd.detectChanges();
      })
  }

  getCurrentBudget(budgets:any[]) {
      if (budgets != null && budgets.length != 0) {
          return budgets[0].current;
      } else {
          return '';
      }
  }

  getResponsible(responsibles:any[],type:string){
      if (responsibles && responsibles.length != 0){
          for (let i=0;i<responsibles.length;i++){
              if (responsibles[i].type==type){
                  return responsibles[i].name;
              }
          }
      }
      return '';
  }

    toggleChange(){
        this.isNew = (!this.isNew);
        this.updateProject =  {id:null,name:null};
        this.projectForm.resetAllForms();
    }

    projectEvent($event){
      console.log($event);
        let title='';
        let text = '';
        let confirmTitle='';
        let confirmMessage='';
        let req = {
            id:this.updateProject.id,
            name:$event.projectName,
            responsible:$event.projectResponsible,
            budgets:$event.projectBudgets,
            roleCosts:$event.rolesCosts
        };
      if (this.isNew){
          title='Create Project';
          text = 'You are about to create a new project, are you sure ?';
          confirmTitle='Project Created';
          confirmMessage='project has been created successfully!';
      } else {
          this.updateTheProject(req);
          return;
      }


      this.alert.log(title,text, "Yes",confirmTitle,confirmMessage,()=> {
          this.api.addProject(req).subscribe((res) => {
              console.log(res);

          }, (err) => {
              console.log(err);
              swal('Error','request failed','error');
          })
      },()=>{

      });
    }

    updateTheProject(req):any{
        if (!this.isNew){
            let title='Update Project';
            let text = 'You are about to update the project, are you sure ?';
            let confirmTitle='Project Updated';
            let confirmMessage='project has been updated successfully!';
            this.alert.log(title,text, "Yes",confirmTitle,confirmMessage,()=> {
                this.api.updateProject(req).subscribe((res) => {
                    console.log(res)
                }, (err) => {
                    console.log(err);
                    swal('Error','request failed','error');
                })
            },()=>{})
        }
    }

selectProject(project){
      console.log(project);
      if (this.isNew){
          this.updateProject = {id:null,name:null};
          return;
      }
      this.updateProject = project;
      this.projectForm.projectForm.get('projectName').setValue(project.name);
      this.projectForm.disableProjectNameField = true;
      this.projectForm.projectForm.get('projectResponsible').setValue(project.responsible);
      this.projectForm.responsiblesDataSource = new MatTableDataSource(project.responsible);
      this.projectForm.projectForm.get('rolesCosts').setValue(project.roleCosts);
      this.projectForm.billingRolesDataSource = new MatTableDataSource(project.roleCosts);
      this.projectForm.projectForm.get('projectBudgets').setValue(project.budgets);
      this.projectForm.budgetsDataSource = new MatTableDataSource(project.budgets);
    }

}