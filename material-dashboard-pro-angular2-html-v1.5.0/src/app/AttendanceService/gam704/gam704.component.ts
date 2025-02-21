///<reference path="../../../../node_modules/@types/jquery/index.d.ts"/>
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gam704Service} from './gam704.service';
import * as moment from "moment";
import swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-gam704',
    templateUrl: './gam704.component.html',
    styleUrls: ['./gam704.component.scss']
})
export class Gam704Component implements OnInit {
    public SERVER_URL: string = environment.serverUrl;
    reportForm = new FormGroup({
        departmentId: new FormControl('', []),
        departmentName: new FormControl('', []),
        programId: new FormControl('', [Validators.required]),
        //projectName: new FormControl('',[Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required])
    });

    programs: any[];
    departments: any[];

    projects: any[];
    reportSummary: any;
    downloadRequestObject: any;
    roles = [];
    reportSummaryDataSource = new MatTableDataSource(this.roles);
    reportColumns = ['Role', 'Normal Days', 'Weekends', 'Counted Exceptions',
        'Total Days', 'No Of Employees', 'Rate', 'Cost'];

    constructor(private api: Gam704Service, private cd: ChangeDetectorRef, private router: Router, private alert: AlertService, private http: HttpClient) { }

    ngOnInit() {
        this.getProjects();
        this.getPrograms();
    }

    numberWithCommas(x) {
        return x.toLocaleString()
    }

    getProjects() {
        this.api.getProjects()
            .subscribe(res => {
                this.projects = res.body;
            },
                (error) => {
                    alert("error");
                }
            )

    }

    getPrograms() {
        this.api.getPrograms()
            .subscribe(res => {
                this.programs = res;
                console.log(this.programs);
            },
                (err) => {
                    alert("could not retrieve programs!!")
                }
            );
    }

    getSummary(summary: any) {
        console.log("Here!", this.reportForm);
        var formattedEndDate = moment(this.reportForm.value.endDate).format('DD/MM/YYYY');
        var formattedStartDate = moment(this.reportForm.value.startDate).format('DD/MM/YYYY');

        if (this.validateInput(summary)) {
            this.getReport(
                {
                    // projectName:summary.projectName,
                    // startDate:formattedStartDate,
                    // endDate:formattedEndDate
                    //departmentId:summary.departmentId,
                    id: this.reportForm.value.programId.id,
                    type: 'PROGRAM',
                    name: this.reportForm.value.programId.name,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                });
        }

    }



    parseDate(str) {
        var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
            , d = (m) ? new Date(m[3], m[2] - 1, m[1]) : null
            , matchesPadded = (d && (str == [this.pad(d.getDate()), this.pad(d.getMonth() + 1), d.getFullYear()].join('/')))
            , matchesNonPadded = (d && (str == [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')));
        return (matchesPadded || matchesNonPadded) ? d : null;
    }

    pad(x) { return ((('' + x).length == 2) ? '' : '0') + x; }

    calculateTotal() {

        this.reportSummary.roleCost;
        var sumNormalManDays = 0, sumApprovedWeekEnds = 0, sumApprovedOthers = 0,
            sumTotalManDays = 0, sumNumberOfEmployees = 0, sumCost = 0,
            sumExceptionsCounted = 0;
        for (var i = 0; i < this.reportSummary.roleCost.length; i++) {
            sumNormalManDays += this.reportSummary.roleCost[i].normalManDays;
            sumApprovedWeekEnds += this.reportSummary.roleCost[i].approvedWeekEnds;
            sumApprovedOthers += this.reportSummary.roleCost[i].approvedOthers;
            sumTotalManDays += this.reportSummary.roleCost[i].totalManDays;
            sumNumberOfEmployees += this.reportSummary.roleCost[i].numberOfEmployees;
            sumCost += this.reportSummary.roleCost[i].cost;
            sumExceptionsCounted += this.reportSummary.roleCost[i].exceptionsCounted;

        }
        this.reportSummary.roleCost.push(
            {
                "roleName": "Cumulative Total",
                "normalManDays": sumNormalManDays,
                "approvedWeekEnds": sumApprovedWeekEnds,
                "approvedOthers": sumApprovedOthers,
                "totalManDays": sumTotalManDays,
                "numberOfEmployees": sumNumberOfEmployees,
                "exceptionsCounted": sumExceptionsCounted,
                "rate": '0',
                "cost": sumCost
            },
        )


    }
    deepCopy(src) {
        return JSON.parse(JSON.stringify(src))
    }

    getReport(requestObj: any) {
        this.api.getSummary(requestObj).subscribe((res) => {
            console.log(res);
            this.downloadRequestObject = this.deepCopy(res);
            this.reportSummary = res;
            if (res.locationBased) {
                this.reportColumns = ['Role', 'Location', 'Normal Days', 'Weekends', 'Counted Exceptions',
                    'Total Days', 'No Of Employees', 'Rate', 'Cost'];

                console.log(res.roleCost[0].location);
                res.roleCost.sort((role1, role2) => {
                        return role2.location.localeCompare(role1.location);
                })
            } else {
                this.reportColumns = ['Role', 'Normal Days', 'Weekends', 'Counted Exceptions',
                    'Total Days', 'No Of Employees', 'Rate', 'Cost'];
            }
            this.calculateTotal()
            this.roles = this.reportSummary.roleCost;
            this.reportSummaryDataSource = new MatTableDataSource(this.roles);
            this.cd.detectChanges();
        }, (err) => {
            var message = '';
            if (err.error.message) {
                message = err.error.message;
            }
            else {
                message = 'unknown error';
            }
            swal(message, this.errorsToString(err.error.subErrors), 'error');
        }
        )
    }

    errorsToString(subErrors: any[]) {
        if (!subErrors) {
            return ' ';
        }
        var errors = ' ';
        for (var i = 0; i < subErrors.length; i++) {
            errors += subErrors[i].message + '\n';
        }
        return errors;
    }

    generateWorkFlow(request: any) {
        var formattedEndDate = moment(request.endDate).format('DD/MM/YYYY');
        var formattedStartDate = moment(request.startDate).format('DD/MM/YYYY');
        var r = this.router;
        if (this.validateInput(request)) {

            this.alert.log("Cost Report Generation", "You are about to generate cost report, are you sure ?", "Yes", "Report Generated", "Your transaction was successfully completed", () => {

                this.api.generateWorkFlow(
                    // {
                    //     projectName:request.projectName,
                    //     startDate:formattedStartDate,
                    //     endDate:formattedEndDate
                    // }
                    {
                        // projectName:summary.projectName,
                        // startDate:formattedStartDate,
                        // endDate:formattedEndDate
                        //departmentId:summary.departmentId,
                        id: this.reportForm.value.programId.id,
                        type: 'PROGRAM',
                        name: this.reportForm.value.programId.name,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    }
                ).subscribe(
                    () => { },
                    () => {
                        alert("Request Failed: failed to generate Report!");
                    }
                )
            }, () => {
                setTimeout(function () {
                    r.navigate(['/attendanceService/gam788']);
                }, 1000)
            })



        }
    }


    downloadWorkFlow(request: any) {
        //reportForm.value
        //          C:\Users\yassiry\Desktop\files\temp_workbook.xlsx


        $.ajax({
            url: this.SERVER_URL+"/workflowservice/downloadTemp",
            type: "POST",
            dataType: "application/hal+json", // expected format for response
            contentType: "application/json", // send as JSON
            data: JSON.stringify(this.downloadRequestObject),

            complete: function (retData) {

            },

            success: function (retData) {

                var link = document.createElement("a");
                link.id = 'someLink'; //give it an ID!
                link.href = this.SERVER_URL+"/workflowservice/download?path=/tmp/temp_workbook.xlsx";

                //Add the link somewhere, an appendChild statement will do.
                //Then run this
                document.getElementById('someLink').click();
            },
            error: function (retData) {
                var link = document.createElement("a");
                link.id = 'someLink'; //give it an ID!
                link.href = this.SERVER_URL+"/workflowservice/download?path=/tmp/temp_workbook.xlsx";

                //Add the link somewhere, an appendChild statement will do.
                //Then run this
                link.click();
            },
        });
    }

    validateInput(summary: any): boolean {
        var formattedEndDate = moment(summary.endDate).format('DD/MM/YYYY');
        var formattedStartDate = moment(summary.startDate).format('DD/MM/YYYY');

        if (!this.parseDate(formattedStartDate)) {
            swal('format error', 'start date format error', 'error');
            return false;
        }
        if (!this.parseDate(formattedEndDate)) {
            swal('format error', 'end date format error', 'error');
            return false;
        }
        if (summary.startDate.getTime() > summary.endDate.getTime()) {
            swal('error', 'start date can not be larger than end date', 'error');
            return false;
        }

        return true;
    }

    changeDepartments(program) {
        console.log(program);
        this.departments = program.departments;
    }

    endDateFilter = (d: Date | null): boolean => {
        return d > this.reportForm.value.startDate;
      }
}
