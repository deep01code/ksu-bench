import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeManagementService } from '../../sharedService/employee-management.service';
import { DataTableConfigService } from '../../../common-services/data-table-config/data-table-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    public isLoading: boolean = false;
    public employees: any[];
    public programs: any[];
    public selectedProgram: string;
    public selectedDepartment: string;
    public selectedSystem: string;
    public selectedProgramIndex: number = 0;
    public selectedDepartmentIndex: number = 0;
    public billingRole: any;
    public position: any;
    public startDate: any;
    public selectedProgramForList;
    constructor(private api: EmployeeManagementService,
        private config: DataTableConfigService,
        private route: Router) { }

    ngOnInit() {
        this.isLoading = true;
        this.api.getPrograms().subscribe((data) => {
            this.programs = data;
            this.selectedProgram = data[0];
            this.selectedProgramForList = data[0]
            this.selectedDepartment = this.selectedProgram["departments"][0]

            this.api.getAllEmployees(this.selectedProgram["name"]).subscribe((data) => {
                data.map(emp => {
                    if (emp.resignDate) {
                        let date = new Date(emp.resignDate);
                        emp.resignDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    }
                })
                this.employees = data;
                this.isLoading = false;
            })
        });


        this.configuration.searchEnabled = true;




    }


    @ViewChild("form") form: NgForm
    public configuration = this.config.getConfig();
    public columns = [
        { title: "Name", key: "employeeName" },
        { title: "ID", key: "employeeId" },
        { title: "Program", key: "program" },
        { title: "Department", key: "department" },
        { title: "Team", key: "team" },
        { title: "System", key: "system" },
        { title: "Billing Role", key: "billingRole" },
        { title: "Role", key: "role" },
        { title: "LWD", key: "resignDate" },
    ];
    public data = [];
    public eventEmitted(employee) {
    }

    public goToHistory(row) {
        this.api.setEmployee(row);
        this.route.navigate(["employees/" + row.employeeId + "/history"])
    }

    submitForm() {
        let sDate = new Date(this.form.value.startDate);
        let startDate = sDate.getDate() + "/" + (sDate.getMonth() + 1) + "/" + sDate.getFullYear();
        //return;
        let self = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Add Employee!',
            buttonsStyling: false
        }).then(function () {

            self.isLoading = true;
            self.api.addEmployee(self.selectedProgram, self.form.value, startDate).subscribe((data) => {
                self.isLoading = false;
                swal({
                    title: 'Done!',
                    text: 'An employee with has been added successfully',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }, (err) => {
                swal({
                    title: 'Error!',
                    text: 'Error! not able to add employee, please enter valid employee ID.',
                    type: 'error',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            });

        }).catch(swal.noop);
    }

    updateAllHistory() {
        let self = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Add Employee!',
            buttonsStyling: false
        }).then(function () {

            self.isLoading = true;
            self.api.updateAllHP(self.selectedProgramForList.name).subscribe((data) => {
                self.isLoading = false;
                swal({
                    title: 'Done!',
                    text: 'Employee HP records has been updated successfully',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }, (err) => {
                swal({
                    title: 'Error!',
                    text: 'Error! not able to update employee, please contact administrator for more details!',
                    type: 'error',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            });

        }).catch(swal.noop);
    }

    setSelectedProgramIndex(index) {
        this.selectedProgramIndex = index;
    }
    setSelectedDepartmentIndex(index) {
        this.selectedDepartmentIndex = index;
    }

    getEmployeesBasedOnProgram(program) {
        this.isLoading = true;
        this.api.getAllEmployees(program["name"]).subscribe((data) => {
            data.map(emp => {
                if (emp.resignDate) {
                    let date = new Date(emp.resignDate);
                    emp.resignDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                }
            })
            this.employees = data;
            this.isLoading = false;
        })
    }

}
