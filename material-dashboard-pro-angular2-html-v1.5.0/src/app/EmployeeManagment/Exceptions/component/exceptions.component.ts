import { Component, OnInit, ViewChild } from '@angular/core';
import { ExceptionService } from '../exception.service';
import { NgForm, NgModel } from '@angular/forms';
import { EmployeeManagementService } from '../../sharedService/employee-management.service';
import { DataTableConfigService } from '../../../common-services/data-table-config/data-table-config.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exceptions',
    templateUrl: './exceptions.component.html',
    styleUrls: ['./exceptions.component.scss'],
    providers: [ExceptionService]
})
export class ExceptionsComponent implements OnInit {
    public isLoading = false;
    public programs: any[];
    public selectedProgram: string;
    public selectedDepartment: string;
    public selectedProgramIndex: number = 0;
    public employeeList: any[] = [];
    public selectedEmployees: any[];
    public employeeFiler: string = '';
    public overlappedExceptions: string[];
    public showResult = false;
    public exceptionTypes;
    public calculationTypes;
    public startDate: Date;
    public endDate: Date;

    @ViewChild("form") form: NgForm;
    constructor(private api: ExceptionService,
        private eApi: EmployeeManagementService,
        private config: DataTableConfigService,
        private route: Router,
        private sharedApi: EmployeeManagementService) { }

    ngOnInit() {
        this.isLoading = true;
        this.api.getExceptions().subscribe((data) => {
            this.isLoading = false;
            this.calculationTypes = data.calculationTypes;
            this.exceptionTypes = data.exceptionTypes;

        });

        this.isLoading = true;
        this.eApi.getPrograms().subscribe((data) => {
            this.programs = data;
            this.selectedProgram = data[0];
            this.selectedDepartment = this.selectedProgram["departments"][0]
        });
    }

    startDateFilter = (date: Date): boolean => {
        let now = new Date()
        return date >= new Date(now.getFullYear(), now.getMonth() - 8, now.getDate()) && date <= new Date();
    }

    endDateFilter = (date: Date): boolean => {
        let now = new Date()
        return (date <= new Date()) && (date >= this.startDate);
    }

    //*********************************************
    public configuration = this.config.getConfig();
    public columns = [
        { title: "Name", key: "employeeName" },
        { title: "ID", key: "employeeId" },
        { title: "Team", key: "team" },
        { title: "System", key: "system" },
        { title: "Billing Role", key: "billingRole" },
        { title: "Role", key: "role" }
    ];
    public data = [];
    public eventEmitted(employee) {
    }
    //*********************************************

    public submitForm() {
        let self = this;
        swal({
            title: 'Are you sure you want to apply exception for below list of employees??',
            text: 'You will not be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Add Employee!',
            buttonsStyling: false
        }).then(function () {
            self.isLoading = true;
            self.api.applyException(self.form.value).subscribe((data) => {
                self.isLoading = false;
                if (data) {
                    swal({
                        title: 'Error!',
                        text: `Some of the employees have overlapped exception, please remove the overlapped records`,
                        type: 'error',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                    self.overlappedExceptions = data
                } else {
                    swal({
                        title: 'Done!',
                        text: 'An exceptions has been applied, you will be redirected to view exceptions page.',
                        type: 'success',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                    self.sharedApi.setSelectedProgram(self.selectedProgram);
                    self.sharedApi.setSelectedDepartment(self.selectedDepartment);
                    self.route.navigate(["/employees/view-exceptions"]);
                }
            }, (err) => {
                self.isLoading = false;
                swal({
                    title: 'Error!',
                    text: 'An error occurred, please try again laer, or contact with system admin. ',
                    type: 'error',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            });
        }).catch(reason => { console.log(reason) });
    }

    public setSelectedProgramIndex(index) {
        this.selectedProgramIndex = index;
    }

    public getDepartmentEmployees() {

        this.api.getListOfEmployees(this.selectedProgram, this.selectedDepartment).subscribe((data) => {
            this.employeeList = data
        })
    }

    public selectAll(select: NgModel, values, target: HTMLElement) {
        if (!select.value || (!select.dirty && select.value > 0) || !select.valid || select.value.length < values.length) {
            target.innerText = "Deselect All"
            select.update.emit(values);
        } else {
            target.innerText = "Select All"
            select.update.emit([]);
        }
    }
}
