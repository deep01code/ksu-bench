import { ExceptionService } from './../../Exceptions/exception.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ViewExceptionsService } from '../view-exceptions.service';
import { NgForm } from '@angular/forms';
import { EmployeeManagementService } from '../../sharedService/employee-management.service';
import { DataTableConfigService } from '../../../common-services/data-table-config/data-table-config.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-view-exceptions',
    templateUrl: './view-exceptions.component.html',
    styleUrls: ['./view-exceptions.component.scss'],
    providers: [ViewExceptionsService, ExceptionService]
})
export class ViewExceptionsComponent implements OnInit, AfterViewInit {
    public programs: any[];
    public selectedProgram: string;
    public selectedDepartment: string;
    public selectedProgramIndex: number = 0;
    public isLoading = false;
    public calculationTypes = [];
    public exceptionTypes = [];
    public employeesExceptions;

    @ViewChild("form") form: NgForm;
    constructor(private api: ViewExceptionsService,
        private exApi: ExceptionService,
        private eApi: EmployeeManagementService,
        private config: DataTableConfigService,
        private sharedApi: EmployeeManagementService,
        private cdRef: ChangeDetectorRef) { }

    ngOnInit() {

        this.isLoading = true;
        this.api.getExceptions().subscribe((data) => {
            this.isLoading = false;
            this.calculationTypes = data.calculationTypes;
            this.exceptionTypes = data.exceptionTypes;
        });

        this.api.getExceptions()

        this.isLoading = true;
        this.eApi.getPrograms().subscribe((data) => {
            this.programs = data;
            let program = this.sharedApi.getSelectedProgram();
            let department = this.sharedApi.getSelectedDepartment();
            if (program) {
                this.selectedDepartment = department;
                this.selectedProgram = program;
                this.setEmployeeExceptions({ program: program, department: department });
                this.cdRef.detectChanges();
            } else {
                this.selectedProgram = data[0].name;
                //this.selectedDepartment = data[0]["departments"][0].name
            }
        });
    }

    ngAfterViewInit() {

        let program = this.sharedApi.getSelectedProgram();
        let department = this.sharedApi.getSelectedDepartment();
        if (program) {
            this.selectedDepartment = department;
            this.selectedProgram = program;
            this.setEmployeeExceptions({ program: program, department: department });
            this.cdRef.detectChanges();
        }
    }

    public setSelectedProgramIndex(index) {
        this.selectedProgramIndex = index;
    }

    public search() {
        this.setEmployeeExceptions(this.form.value);
    }

    public setEmployeeExceptions(obj) {
        this.isLoading = true;
        this.api.getEmployeesExceptions(obj).subscribe((data) => {
            this.isLoading = false;
            this.employeesExceptions = data
        }, (err) => {
            this.isLoading = false;
        })
    }

    //*********************************************
    public configuration = this.config.getConfig();
    public columns = [
        { title: "Name", key: "employee.employeeName" },
        { title: "ID", key: "employee.employeeId" },
        { title: "Team", key: "employee.team" },
        { title: "System", key: "employee.system" },
        { title: "Billing Role", key: "employee.billingRole" },
        { title: "Role", key: "employee.role" },
        { title: "Exception Type", key: "exceptionId.exceptionType" },
        { title: "Calculation Type", key: "calculationId.calculationType" },
        { title: "Start Date", key: "fromDate" },
        { title: "End Date", key: "toDate" },
        { title: "Delete", key: "Delete" }
    ];
    public data = [];
    public eventEmitted(employee) {
    }

    public removeException(row) {
        let self = this;
        console.log(row)
        swal({
            title: 'Are you sure you want to delete exception for ' + row.employee.employeeName + '?',
            text: 'You will not be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Remove Exception!',
            buttonsStyling: false
        }).then(function () {
            self.isLoading = true;
            self.exApi.removeException(row.id).subscribe((data) => {
                self.isLoading = false;
                swal({
                    title: 'Done!',
                    text: 'An exceptions has been removed',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
                self.search();
            }, (err) => {
                self.isLoading = false;
                swal({
                    title: 'Error!',
                    text: 'An error occurred, please try again later, or contact with system admin. ',
                    type: 'error',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            });
        }).catch(reason => { console.log(reason) });
    }
}
