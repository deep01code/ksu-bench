import {Component, ElementRef, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { RoleCost } from '../../classes/gam50/role-cost';
import { Gam50Service } from '../../services/gam50/gam50.service'
import { RoleAttendanceEntriesDto} from '../../classes/gam50/role-attendance-entries-dto';
import { RoleAttendance } from '../../classes/gam50/role-attendance';
import {MonthlyCostDto} from '../../classes/gam50/monthly-cost-dto';
import * as Chartist from 'chartist';
import Chart from 'chart.js';
import { ChartDataSet } from '../../classes/gam51/chart-data-set';
import {FormService} from '../../services/commonServices/formService/form-service.service';
import {FormComponent} from '../commonComponents/form/form.component';

@Component({
  selector: 'app-gam51',
  templateUrl: './gam51.component.html',
  styleUrls: ['./gam51.component.scss']
})
export class Gam51Component implements OnInit {



    selectedProjects: string[];
    selectedRoles: string[];
    selectedYear: string;
    attendance: RoleAttendance[];
    maxMonth: number = 0;
    isLoading: boolean = false;
    yearMonthes: string[] = [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec."
    ];
    actualMonths: Array<string>;
    @ViewChild(FormComponent) form: FormComponent

    type: string;
    public lineChartData:any[];
    public datasets:Array<any>=new Array<any>();
    public options:any={};
    public colors:Array<any>;
    public labels=new Array<any>();
    public lineChartType:string ='line';
    public lineChartLegend:boolean = true;


    constructor(private service: Gam50Service, private api: FormService) {
    }

    ngOnInit() {}

    setActualMonths(arr: RoleAttendance[]): void {
        var data = new Array<string>();
        this.maxMonth = 0;
        for (var i: number = 0; i < arr.length; i++) {
            if (arr[i].monthlyCostDTO.length > this.maxMonth) {
                this.maxMonth = arr[i].monthlyCostDTO.length;
            }
        }
        for (var i: number = 0; i < this.maxMonth; i++) {
            data.push(this.yearMonthes[i]);
            this.actualMonths.push(this.yearMonthes[i]);
        }
        if (this.actualMonths) {
            console.log('this is actMonths '+this.actualMonths);
            this.actualMonths = data;
            console.log('this is actMonths '+this.actualMonths);
        }
    }

    getAttendanceCostPerRole(): Array<Array<number>> {
        var arrOfArr: Array<Array<number>> = new Array<Array<number>>();
        for (var i = 0; i < this.attendance.length; i++) {
            var arr: Array<number> = new Array<number>();
            var items: MonthlyCostDto[] = this.attendance[i].monthlyCostDTO;
            for (var j = 0; j < items.length; j++) {
                arr.push(items[j].cost);
            }
            arrOfArr.push(arr);
        }
        return arrOfArr;
    }



    submitForm(e: any){
        this.isLoading = true;
        this.actualMonths = new Array<string>();
        this.service.getAttendance(e)
            .subscribe(attendance =>{
                    this.setAttendance(attendance);
                    this.setActualMonths((attendance));
                    this.setLineChartData();
                    this.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                });
    }

    setAttendance(arr: RoleAttendance[]): void {
        this.attendance = arr;
    }

    getMonthlyRoleCostDataset(roleCost:MonthlyCostDto[]):Array<number>{
        var arr = new Array();
        for (var j = 0; j < roleCost.length; j++) {
            arr.push(roleCost[j].cost);
        }
        console.log(arr);
        return arr;
    }

    setLineChartData():void{
        this.labels = this.actualMonths;
        this.datasets.length = 11;
        var data = new Array<{data: number[], label: string}>();
        for (var i=0;i<this.attendance.length;i++){
            var rolecostArr = new Array(this.getMonthlyRoleCostDataset(this.attendance[i].monthlyCostDTO));
            var dataset = {data:rolecostArr[0]
                ,label:this.attendance[i].role};
            data.push(dataset);
            this.datasets.push(dataset)
        }

        console.log("finished setting graph data");

    }
}











