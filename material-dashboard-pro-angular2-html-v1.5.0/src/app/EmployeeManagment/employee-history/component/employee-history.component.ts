import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeManagementService } from '../../sharedService/employee-management.service';
import { DataTableConfigService } from '../../../common-services/data-table-config/data-table-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgModel, NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { error } from 'util';

@Component({
    selector: 'app-employee-history',
    templateUrl: './employee-history.component.html',
    styleUrls: ['./employee-history.component.scss']
})
export class EmployeeHistoryComponent implements OnInit, AfterViewInit {

    public isLoading: boolean = false;
    public employees: any[];
    public programs: any[];
    public selectedProgram: string;
    public selectedDepartment: string;
    public selectedSystem: string;
    public selectedTeam: string;
    public selectedProgramIndex: number = 0;
    public selectedDepartmentIndex: number = 0;
    public selectedBillingRole;
    public billingRole;
    public position;
    public startDate;
    public endDate;
    public employeeHistory: any[];
    public updateHistory = false;
    public resignDate;
    @ViewChild("form") form: NgForm;
    @ViewChild("resignForm") resignForm: NgForm;
    constructor(private api: EmployeeManagementService,
        private config: DataTableConfigService,
        private route: Router,
        private activeRoute: ActivatedRoute,
        private _location: Location) { }

    ngOnInit() {
        if (this.api.getEmployeeHistory(this.activeRoute.snapshot.paramMap.get("id"))) {
            this.isLoading = true;
            this.api.getEmployeeHistory(this.activeRoute.snapshot.paramMap.get("id")).subscribe((data) => {
                this.isLoading = false;
                data.map(obj => {
                    obj.fromDate = new Date(obj.fromDate);
                    obj.fromDate = obj.fromDate.getDate() + "/" + (obj.fromDate.getMonth() + 1) + "/" + obj.fromDate.getFullYear()
                    obj.toDate = new Date(obj.toDate)
                    obj.toDate = obj.toDate.getDate() + "/" + (obj.toDate.getMonth() + 1) + "/" + obj.toDate.getFullYear()

                })
                this.employeeHistory = data;
                this.api.getEmployee(this.employeeHistory[0].links[0].href).subscribe(res=>{
                    this.api.setEmployee(res);
                })
                this.selectedProgram = (this.employeeHistory[0].program)
                this.selectedDepartment = (this.employeeHistory[0].department)
                this.selectedTeam = (this.employeeHistory[0].team)
                this.selectedSystem = (this.employeeHistory[0].system)
                this.selectedBillingRole = (this.employeeHistory[0].billingRole)
                this.selectedDepartment = (this.employeeHistory[0].department)
                this.selectedTeam = (this.employeeHistory[0].team)
                this.selectedBillingRole = (this.employeeHistory[0].billingRole)
            },
                (err) => {

                })

        } else {
            this.route.navigate(["/employees"])
        }
        this.isLoading = true;
        this.api.getPrograms().subscribe((data) => {
            this.programs = data;
            this.selectedProgram = data[0];
            this.selectedDepartment = this.selectedProgram["departments"][0]
        });
    }

    ngAfterViewInit() {

    }



    public configuration = this.config.getConfig();
    public columns = [
        { title: "Program", key: "program" },
        { title: "Department", key: "department" },
        { title: "Team", key: "team" },
        { title: "System", key: "system" },
        { title: "Billing Role", key: "billingRole" },
        { title: "Total Days", key: "logCount" },
        { title: "Start Date", key: "fromDate" },
        { title: "End Date", key: "toDate" }
    ];
    public data = [];

    public eventEmitted(row) {

    }


    backClicked() {
        this._location.back();
    }

    public setSelectedDepartment(data) {
        this.selectedDepartmentIndex = data;
    }

    startDateFilter = (date: Date): boolean => {
        let now = new Date()
        return date >= new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()) && date <= new Date();
    }

    endDateFilter = (date: Date): boolean => {
        return date >= this.startDate;
    }

    public submitForm() {
        let program = this.form.value.program;
        let department = this.form.value.department;
        let team = this.form.value.team;
        let system = this.form.value.system;
        let billingRole = this.form.value.billingRole;
        let startDate = this.form.value.startDate && this.updateHistory ? this.form.value.startDate : undefined;
        let sDate = startDate ? startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear() : undefined;
        let endDate = this.form.value.endDate && this.updateHistory ? this.form.value.endDate : undefined;
        let eDate = endDate ? endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear() : undefined
        let obj = {
            program: program,
            department: department,
            team: team,
            system: system,
            startDate: sDate,
            endDate: eDate,
            billingRole: billingRole,
        }

        let self = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            type: 'question',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Update Employee!',
            buttonsStyling: false
        }).then(function () {

            self.isLoading = true;
            self.api.updateAllocation(obj).subscribe(
                (data) => {
                    swal({
                        title: 'Done!',
                        text: 'Employee allocation has been updated successfully',
                        type: 'success',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                    data.map(obj => {
                        obj.fromDate = new Date(obj.fromDate);
                        obj.fromDate = obj.fromDate.getDate() + "/" + (obj.fromDate.getMonth() + 1) + "/" + obj.fromDate.getFullYear()
                        obj.toDate = new Date(obj.toDate)
                        obj.toDate = obj.toDate.getDate() + "/" + (obj.toDate.getMonth() + 1) + "/" + obj.toDate.getFullYear()

                    })
                    self.employeeHistory = [...data];
                    self.isLoading = false;
                }, (err) => {
                    swal({
                        title: 'Error!',
                        text: 'Failed to update employee allocation, please try again later!',
                        type: 'error',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                    self.isLoading = false;
                });
        })

    }


    public submitresignForm() {
        let date: Date = this.resignForm.value.resignDate ? this.resignForm.value.resignDate : new Date();
        let rDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        let self = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            type: 'question',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Remove employee!',
            buttonsStyling: false
        }).then(function () {
            self.api.resignEmployee(rDate).subscribe(res => {
                swal({
                    title: 'Done!',
                    text: 'Employee end date has been updated to: ' + rDate,
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
                res.map(obj => {
                    obj.fromDate = new Date(obj.fromDate);
                    obj.fromDate = obj.fromDate.getDate() + "/" + (obj.fromDate.getMonth() + 1) + "/" + obj.fromDate.getFullYear()
                    obj.toDate = new Date(obj.toDate)
                    obj.toDate = obj.toDate.getDate() + "/" + (obj.toDate.getMonth() + 1) + "/" + obj.toDate.getFullYear()

                })
                self.employeeHistory = res;
            }, (error) => {
                swal({
                    title: 'Failed!',
                    text: 'Not able to update employee LWD, please try again later: ',
                    type: 'error',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            })
        });

    }

    setSelectedProgramIndex(index) {
        this.selectedProgramIndex = index;
    }
    setSelectedDepartmentIndex(index) {
        this.selectedDepartmentIndex = index;
    }
}
