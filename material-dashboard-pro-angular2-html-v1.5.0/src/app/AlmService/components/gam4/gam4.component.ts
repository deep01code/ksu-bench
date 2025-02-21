import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Gam4Service} from '../../services/gam4/gam4.service';
import {Gam4} from '../../classes/gam4/gam4';
import { Release } from '../../classes/release'
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {ReleaseComponent} from '../release/release.component';
import {ReleaseService} from '../../services/release/release.service';

declare let $: any;


@Component({
    selector: 'app-gam4',
    templateUrl: './gam4.component.html',
    styleUrls: ['./gam4.component.scss'],
})
export class Gam4Component implements OnInit, AfterViewInit, AfterViewChecked {
    public releases: Release[];
    public passCount: number[];
    public ncCount:number[];
    public naCount: number[];
    public nrCount: number[];
    public blockedCount: number[];
    public failedCount: number[];
    public otherCount: number[];
    public totalCount: number[];
    public passPrecentage: number[];
    public otherPrecentage: number[];
    public toggleStatus: boolean = true;
    public totalTCs: number;
    public isLoading: boolean = false;

    @ViewChild(ReleaseComponent) release:ReleaseComponent;
    public type: string = "release"
    public barChartData:any[]= [
        {data: [],backgroundColor: 'rgba(0, 0, 255, 0.50)',hoverBackgroundColor: 'rgba(0, 0, 255, 0.60)',  label: 'Pass'},
        {data: [],backgroundColor: 'rgba(255, 0, 0, 0.50)',hoverBackgroundColor: 'rgba(255, 0, 0, 0.60)',  label: 'Other'}];


    constructor(private gam4:Gam4Service, private api: ReleaseService) {

    }

    public setData(id:number, type:string): void{
        this.isLoading = true;
        this.gam4.getExecTestCases(id, type).
        subscribe((data) =>  {
                    this.setBarChartLabels(data.date);
                    this.setBarChartData(data);
                    this.totalTCs = data.totalTCs;
                    this.isLoading = false;
                },
            (err) => {
                    this.isLoading = false
                }
        );
    }

    public setReleases(): void{
        this.isLoading = true;
        this.api.getReleases(this.type)
            .subscribe(
                (data) => {
                                    this.releases = data;
                                    this.selectedId = data[0].id;
                                    this.setData(this.selectedId, "all");
                                    this.isLoading = false;
                                },
                (error)=> this.isLoading = false
            );
    }

    public selectedId: number;
    // reset chart data when user select new release from the list of releases
    public select(e): void{
        if (this.toggleStatus) {
            this.selectedId = e
            this.setData(e, "all" );
        }else{
            this.selectedId = e
            this.setData(e, "" );
        }
    }
    public toggleChange(e: any): void{
        this.toggleStatus=e;
        if(e) {
            this.setData(this.selectedId, "all")
        }else
            this.setData(this.selectedId, "")
    }
    ngOnInit() {
        this.setReleases();

    }

    ngAfterViewInit(){

    }
    ngAfterViewChecked() {
        //this.setData(this.release.releases[0].id, "all")

    }
    //=====================================================================================
    public barChartLabels:string[];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    public detailedBarChartData:any[]= [
        {data: [],backgroundColor: 'rgba(0, 0, 255, 0.50)',hoverBackgroundColor: 'rgba(0, 0, 255, 0.60)',  label: 'Pass'},
        {data: [],backgroundColor: 'rgba(255, 0, 0, 0.50)',hoverBackgroundColor: 'rgba(255, 0, 0, 0.60)',  label: 'Fail'},
        {data: [],backgroundColor: 'rgba(200, 55, 0, 0.50)',hoverBackgroundColor: 'rgba(200, 55, 0, 0.60)',  label: 'NotCompleted'},
        {data: [],backgroundColor: 'rgba(155, 0, 100, 0.50)',hoverBackgroundColor: 'rgba(155, 0, 100, 0.60)',  label: 'NoRun'},
        {data: [],backgroundColor: 'rgba(100, 0, 155, 0.50)',hoverBackgroundColor: 'rgba(100, 0, 155, 0.60)',  label: 'NA'},
        {data: [],backgroundColor: 'rgba(55, 0, 200, 0.50)',hoverBackgroundColor: 'rgba(55, 0, 200, 0.60)',  label: 'Blocked'}];

    public colors = [{}]; // should be initialized this way to be able to set the colors for chart.


    setBarChartData(data: Gam4): void{
        let arr = this.barChartLabels;
        this.passCount = data.passed;
        this.ncCount = data.notCompleted
        this.naCount = data.na
        this.blockedCount = data.blocked
        this.failedCount = data.failed
        this.nrCount = data.noRun

        this.totalCount = new Array(data.passed.length);
        this.otherCount = new Array(data.passed.length);

        for ( let i = 0; i < arr.length ; i++){
            this.totalCount[i] = this.passCount[i] + this.ncCount[i] + this.naCount[i] + this.blockedCount[i] + this.failedCount[i]+this.nrCount[i];
            this.otherCount[i] = this.ncCount[i] + this.naCount[i] + this.blockedCount[i] + this.failedCount[i]+this.nrCount[i];
        }

        this.barChartData[0].data = this.passCount;
        this.barChartData[1].data = this.otherCount;
        this.setPrecentag(this.passCount, this.otherCount)

        this.detailedBarChartData[0].data = this.passCount;
        this.detailedBarChartData[1].data = this.failedCount;
        this.detailedBarChartData[2].data = this.ncCount;
        this.detailedBarChartData[3].data = this.nrCount;
        this.detailedBarChartData[4].data = this.naCount;
        this.detailedBarChartData[5].data = this.blockedCount;
    }

    public setPrecentag(passCount: number[], otherCount: number[]): void{
        let val;
        this.passPrecentage = new Array(otherCount.length);
        this.otherPrecentage = new Array(otherCount.length);
        for ( let i = 0 ; i < passCount.length ; i++){

            val = ( passCount[i] / (passCount[i] + otherCount[i]) * 100 ).toFixed(2);// ( passCount[i] / (passCount[i] + otherCount[i]) * 100 ).toFixed(1);

            this.passPrecentage[i] =  val ;
            this.otherPrecentage[i] = +(100-val).toFixed(2);
        }
        this.barChartData[0].data = this.passPrecentage;
        this.barChartData[1].data = this.otherPrecentage;
    }


    // used to set the labels under the chart
    setBarChartLabels(data): void{
        this.barChartLabels = data;
    }



    //
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true,
                categoryPercentage: .8, // to control the bars
                barPercentage: .7,
                ticks: {
                    callback: function (value, tooltipItem, data) {

                        return value.substring(3, value.length);
                    }
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: function(value, tooltipItem, data) {
                        return value;
                    }
                }
            }]
        },tooltips: {
            callbacks: {
                title: function(tooltipItem, data){
                    if (tooltipItem[0].datasetIndex === 1){
                        return [tooltipItem[0].xLabel,'Other:']; // this array to return multi line on the tooltip on hover
                    }else{
                        return [tooltipItem[0].xLabel,'Passed:'];
                    }
                },
                label: function(tooltipItem, data, value) {
                    return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                }
            }
        }, 
    };


    public detailedBarChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true,
                categoryPercentage: .8, // to control the bars
                barPercentage: .7,
                ticks: {
                    callback: function (value, tooltipItem, data) {

                        return value.substring(3, value.length);
                    }
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: function(value, tooltipItem, data) {
                        return value
                    }
                }
            }]
        },tooltips: {
            callbacks: {
/*                title: function(tooltipItem, data){
                    if (tooltipItem[0].datasetIndex === 1){
                        return [tooltipItem[0].xLabel,'Other:']; // this array to return multi line on the tooltip on hover
                    }else{
                        return [tooltipItem[0].xLabel,'Passed:'];
                    }
                },
                label: function(tooltipItem, data, value) {
                    return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                }*/
            }
        },
    };

    private calculatePrev(index: number): string{

        if(this.toggleStatus)
            return "";

        let passPrev = 0
        let failedPrev = 0
        let ncPrev = 0
        let naPrev = 0
        let blockerPrev = 0
        let noRunPrev = 0

        for(var i = 0; i <= index; i++){
            passPrev += this.passCount[i];
            failedPrev +=this.failedCount[i];
            ncPrev += this.ncCount[i];
            naPrev += this.naCount[i];
            blockerPrev += this.blockedCount[i];
            noRunPrev += this.nrCount[i];
        }
        let remain = this.totalTCs - ( passPrev + naPrev );
        let remainingTag;
        let trTag = "" +
            "<tr>"+
            "<td>Previous</td>" +
            "<td>"+passPrev+"</td>" +
            "<td>"+failedPrev+"</td>" +
            "<td>"+ncPrev+"</td>" +
            "<td>"+naPrev+"</td>" +
            "<td>"+blockerPrev+"</td>" +
            "<td>"+noRunPrev+"</td>" +
            "</tr>";
        if(!this.toggleStatus){
            remainingTag = "<tr><td>Total Test Cases</td><td colspan='2'>"+this.totalTCs+"</td>" +
                            "<td colspan='2'> Remaining </td> <td colspan='2'> "+remain+" </td></tr>"
        }
        if(index === 0)
            return remainingTag;
        return trTag + remainingTag;
    }
    // events
    public chartClicked(e:any, type: string):void {
        if( e.active.length > 0 ){
            swal({
                title: 'Executed Test Cases Details ('+e.active[0]._model.label+')',
                buttonsStyling: false,
                //timer: 4000, // to hide the modal after 4 sec
                confirmButtonClass: 'btn btn-success',
                html:`
        <div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr>
                        <th> </th>
                        <th>Passed</th>
                        <th>Failed</th>
                        <th>Not Completed</th>
                        <th>NA</th>
                        <th>Blocked</th>
                        <th>No Run</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Current</td>
                        <td>`+ this.passCount[ e.active[0]._index] +`</td>
                        <td>`+ this.failedCount[ e.active[0]._index] +`</td>
                        <td>`+ this.ncCount[ e.active[0]._index] +`</td>
                        <td>`+ this.naCount[ e.active[0]._index] +`</td>
                        <td>`+ this.blockedCount[ e.active[0]._index] +`</td>
                        <td>`+ this.nrCount[ e.active[0]._index] +`</td>
                    </tr>              
                        `+this.calculatePrev(e.active[0]._index)+`
                </tbody>
            </table>
	    </div>`,
                width: '60%'
            }).then(
                function () {},
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer')
                    }
                }).catch(swal.noop);
        }
    }

    public chartHovered(e:any):void {
        //console.log(e);
    }
}
