import { ProgramDetailsComponent } from './../program-details/program-details.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Gam883Service } from '../../gam883/gam883.service';
import { AlertService } from '../../../services/alert/alert.service';
import swal from 'sweetalert2';
import * as moment from "moment";

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

    //department
    departments = [];
    departmentsDataSource = new MatTableDataSource(this.departments);
    departmentColumns = ['Name'];
    programId;
    program;

    budgets = [];
    budgetsDataSource = new MatTableDataSource(this.budgets);
    budgetColumns = ['Original', 'Current', 'start date', 'end date'];

    budgetForm = new FormGroup({
        id: new FormControl(''),
        original: new FormControl('', [Validators.required]),
        current: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required])
    });

    selectedDepartment = { id: null, name: null, roleCosts: null, teams: null, systems: null, positions: null, responsible: null };

    departmentForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });

    //billing roles
    billingRoles = [];
    billingRolesDataSource = new MatTableDataSource(this.billingRoles);
    billingRolesColumns = ['Role Name', 'Rate', 'Priority'];

    billingRoleForm = new FormGroup({
        roleName: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        rate: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required])
    });

    //responsible
    responsibles = [];
    responsiblesDataSource = new MatTableDataSource(this.responsibles);
    resposiblesColumns = ['Type', 'Name', 'Email', 'phone No'];

    responsibleForm = new FormGroup({
        type: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    //Teams,Position and systems
    stringsForm = new FormGroup({
        type: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required])
    });

    teams = [];
    teamsDataSource = new MatTableDataSource(this.teams);
    teamsColumns = ['Teams'];

    systems = [];
    systemsDataSource = new MatTableDataSource(this.systems);
    systemsColumns = ['Systems'];

    positions = [];
    positionsDataSource = new MatTableDataSource(this.positions);
    positionsColumns = ['Positions'];

    constructor(private api: Gam883Service, private alert: AlertService, private route: ActivatedRoute) {
        this.programId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getDepartments(this.programId);
        this.getProgramDetails(this.programId)
    }

    getProgramDetails(programId) {
        this.api.getProgramById(programId).subscribe((res) => {
            if (res.budgets) {
                this.program = res;
                this.budgets = this.program.budgets;
                this.responsibles = this.program;
                this.billingRoles = this.program.roleCosts ? this.program.roleCosts : [];
                this.budgetsDataSource = new MatTableDataSource(this.budgets);
            } else {
                this.budgets = [];
            }
        }, (err) => {
            swal('Error', 'failed to load budgets', 'error');
        })
    }

    getDepartments(programId) {
        this.api.getDepartments(programId).subscribe((res) => {
            if (res == null || res["departments"] == null) {
                this.departments = [];
            } else {
                this.departments = res["departments"];
            }
            this.departmentsDataSource = new MatTableDataSource(this.departments);
        }, (err) => {
            swal('Error', 'failed to load departments, please reload the page', 'error');
        });
    }



    submitBudget(budget) {
        budget.id = null;
        let title = 'Create Budget';
        let text = 'You are about to create a new budget, are you sure ?';
        let confirmTitle = 'Budget Created';
        let confirmMessage = 'budget has been created successfully!';

        this.alert.log(title, text, 'Yes', confirmTitle, confirmMessage, () => {
            this.api.createBudget(this.programId, budget).subscribe((res) => {
                console.log(res);
                this.budgets.push(res);
                this.budgetsDataSource = new MatTableDataSource(this.budgets);
            }, (err) => {
                swal('Error', 'request failed!', 'error');
            })
        }, () => { });
    }

    updateDepartment(department) {
        let program = { id: this.programId };
        console.log(department);
        let title = 'Update Program';
        let text = 'You are about to update ' + this.program.name + ' billig roles, are you sure ?';
        let confirmTitle = 'Billing roles Updated';
        let confirmMessage = 'billing roles has been updated successfully!';

        this.alert.log(title, text, 'Yes', confirmTitle, confirmMessage, () => {
            this.api.updateProgram(this.programId, this.program).subscribe((res) => {
                this.program = res;
                this.billingRoles = this.program.roleCosts;
                this.billingRolesDataSource = new MatTableDataSource(this.billingRoles)
                this.getDepartments(this.programId);
            }, (err) => {
                swal('Error', 'request failed!', 'error');
            })
        }, () => { });
    }

    createDepartment(department) {
        let title = 'Create Department';
        let text = 'You are about to create a new department, are you sure ?';
        let confirmTitle = 'Department Created';
        let confirmMessage = 'department has been created successfully!';

        this.alert.log(title, text, 'Yes', confirmTitle, confirmMessage, () => {

            this.api.addDepartment(this.programId, department).subscribe((res) => {
                console.log(res);
                this.departments.push(res);
                this.departmentsDataSource = new MatTableDataSource(this.departments);
                location.reload();
            }, (err) => {
                swal('Error', 'request failed!', 'error');
            })
        }, () => { });
    }

    selectDepartment(department) {
        console.log(this.program)
        this.selectedDepartment = department;
        if (!this.selectedDepartment.roleCosts) {
            this.selectedDepartment['roleCosts'] = [];
        }
        if (!this.selectedDepartment.teams) {
            this.selectedDepartment['teams'] = [];
        }
        if (!this.selectedDepartment.systems) {
            this.selectedDepartment['systems'] = [];
        }
        if (!this.selectedDepartment.positions) {
            this.selectedDepartment['positions'] = [];
        }
        if (!this.selectedDepartment.responsible) {
            this.selectedDepartment['responsible'] = [];
        }

        this.billingRoles = this.program.roleCosts;
        if (this.program.locationBasedCosts) {
            this.billingRolesColumns = ['Role Name', 'Location', 'Rate', 'Priority'];
            if (this.billingRoles)
                this.billingRoles.sort((r1, r2) => {
                    return r2.location.localeCompare(r1.location)
                });
        } else {
            this.billingRolesColumns = ['Role Name', 'Rate', 'Priority'];
        }
        this.billingRolesDataSource = new MatTableDataSource(this.billingRoles);

        this.teams = this.selectedDepartment.teams;
        this.teamsDataSource = new MatTableDataSource(this.teams);

        this.systems = this.selectedDepartment.systems;
        this.systemsDataSource = new MatTableDataSource(this.systems);

        this.positions = this.selectedDepartment.positions;
        this.positionsDataSource = new MatTableDataSource(this.positions);

        this.responsibles = this.selectedDepartment.responsible;
        this.responsiblesDataSource = new MatTableDataSource(this.responsibles);
    }

    addToDepartment(type, value) {
        switch (type) {
            case 'responsible': {
                if (!this.selectedDepartment.responsible) {
                    this.selectedDepartment["responsible"] = [];
                }
                this.selectedDepartment.responsible.push(value);
                console.log(value);
                this.updateDepartment(this.selectedDepartment);
            }
                break;
            case 'system': {
                if (!this.selectedDepartment.systems) {
                    this.selectedDepartment["systems"] = [];
                }
                this.selectedDepartment.systems.push(value.value);
                console.log(value);
                this.updateDepartment(this.selectedDepartment);
            }
                break;
            case 'team': {
                if (!this.selectedDepartment.teams) {
                    this.selectedDepartment["teams"] = [];
                }
                this.selectedDepartment.teams.push(value.value);
                console.log(value);
                this.updateDepartment(this.selectedDepartment);
            }
                break;
            case 'position': {
                if (!this.selectedDepartment.positions) {
                    this.selectedDepartment["positions"] = [];
                }
                this.selectedDepartment.positions.push(value.value);
                console.log(value);
                this.updateDepartment(this.selectedDepartment);
            }
                break;
            case 'billingRole': {
                if (!this.selectedDepartment.roleCosts) {
                    this.selectedDepartment["roleCosts"] = [];
                }
                this.selectedDepartment.roleCosts.push(value);
                this.updateDepartment(this.selectedDepartment);
                this.program.roleCosts = this.selectedDepartment.roleCosts;
            }
                break;
        }
    }

    departmentDetails: boolean = false;

    displayDepartmentDetails(display: boolean) {
        this.departmentDetails = display;
    }

    programResponsibles = [];
    programResponsiblesDataSource = new MatTableDataSource(this.programResponsibles);
    programResponsiblesColumns = ['Type', 'Name', 'Email', 'phone No'];

    programResponsibleForm = new FormGroup({
        type: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    ratesRulesForm = new FormGroup({
        IN_NO_OUT: new FormControl('', [Validators.required]),
        OUT_NO_IN: new FormControl('', [Validators.required]),
        FULL_DAY_MAX: new FormControl('', [Validators.required]),
        FULL_DAY_MIN: new FormControl('', [Validators.required]),
        HALF_DAY_MIN: new FormControl('', [Validators.required]),
    });

    submitProgramResponsibleForm(responsible) {
        let title = 'Create a new Program Responsible';
        let text = 'You are about to create a new program responsible, are you sure ?';
        let confirmTitle = 'Responsible Created';
        let confirmMessage = 'responsible has been created successfully!';
        this.alert.log(title, text, 'Yes', confirmTitle, confirmMessage, () => {
            this.api.addNewProgramResponsible(this.programId, responsible).subscribe((res) => {
                console.log("success");
                location.reload();
            }, (err) => {
                swal('Error', 'request failed!', 'error');
            })
        }, () => { })
    }

    public updateProgramConfig(){
        let title = 'Update ' + this.program.name + ' configs';
        let text = 'You are about to update '+this.program.name+' configurations, are you sure ?';
        let confirmTitle = 'Configurations Updated';
        let confirmMessage = 'Configurations has been updated successfully!';
        this.alert.log(title, text, 'Yes', confirmTitle, confirmMessage, () => {
            this.api.updateProgramConfig(this.program).subscribe(res=>{
                this.program.ratesRules = res.ratesRules;
            }, err=>{

            })
        }, () => { })


        //this.api.updateProgramConfig(this.program.ratesR);
    }
}
