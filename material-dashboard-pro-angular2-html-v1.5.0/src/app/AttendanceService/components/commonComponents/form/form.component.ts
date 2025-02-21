import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Gam50Service} from '../../../services/gam50/gam50.service';
import {RoleAttendanceEntriesDto} from '../../../classes/gam50/role-attendance-entries-dto';
import {RoleAttendance} from '../../../classes/gam50/role-attendance';
import {RoleCost} from '../../../classes/gam50/role-cost';
import {FormService} from '../../../services/commonServices/formService/form-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Output() onSubmit = new EventEmitter<RoleAttendanceEntriesDto>();


    roles:string[];
    projects:string[];
    years:string[];
    selectedProjects:string[];
    selectedRoles:string[];
    selectedYear:string;
    isLoading: boolean = false;


    constructor(private api : FormService) { }

    ngOnInit() {
        this.getProjects();
        this.getRoles();
        this.getYears();
    }



    getProjects(): void{
        this.isLoading = true;
        this.api.getProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.isLoading = false;
            });
    }

    getRoles(): void{
        this.isLoading = true;
        this.api.getRoles()
            .subscribe(roles => {
                this.roles = roles;
                this.isLoading = false;
            });
    }

    getYears(): void{
        this.isLoading = true;
        this.api.getYears()
            .subscribe(years => {
                this.years = years;
                this.isLoading = false;
            });
    }



    submitForm(): void{
        if (this.selectedYear == null){
            this.selectedYear = this.years[this.years.length-1];
        }
        if (!this.selectedProjects || this.selectedProjects.length == 0){
            this.selectedProjects = this.projects;
        }
        if (!this.selectedRoles || this.selectedRoles.length == 0){
            this.selectedRoles = this.roles;
        }

        let entry :RoleAttendanceEntriesDto = {
            projects:this.selectedProjects,
            roles:this.selectedRoles,
            year:this.selectedYear
        };


        this.onSubmit.emit(entry)

    }



    setChart(att: RoleAttendance[]){

    }
}
