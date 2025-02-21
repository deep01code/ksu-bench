import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Gam52Service} from '../../services/gam52/gam52.service';
import {RoleAttendanceEntriesDto} from '../../classes/gam50/role-attendance-entries-dto';
import {RoleAttendance} from '../../classes/gam50/role-attendance';
import {RoleCost} from '../../classes/gam50/role-cost';
import {FormComponent} from '../commonComponents/form/form.component';
import {FormService} from '../../services/commonServices/formService/form-service.service';
import {Gam4} from '../../../AlmService/classes/gam4/gam4';
import {isSuccess} from '@angular/http/src/http_utils';

@Component({
  selector: 'app-gam52',
  templateUrl: './gam52.component.html',
  styleUrls: ['./gam52.component.scss']
})
export class Gam52Component implements OnInit {
    actualMonths:string[];
    rolesCosts:number[];
    roleCost:RoleCost;
    totalRoles: number;
    isLoading: boolean = false;



    constructor(private api: Gam52Service, private cd: ChangeDetectorRef) { }

    ngOnInit() { }

    submitForm(e: RoleAttendanceEntriesDto){
        this.isLoading = true;
        this.api.getAttendance(e)
            .subscribe(
                (attendance) => { this.setBarChartData(attendance) ; this.isLoading = false},
                (error) => {this.isLoading = false}
            );
    }

    //###########################################Chart######################################


    public barChartLabels:string[];
    public barChartData:any[];
    public barChartType:string = 'pie';

    public colors = [{}]; // should be initialized this way to be able to set the colors for chart.
    setBarChartData(att: RoleAttendance[]): void{
        this.barChartData       = new Array();
        this.rolesCosts         = new Array();


        for(let i=0; i < att.length; i++){
            let monthTotal = 0;
            for( let j = 0; j < att[i].monthlyCostDTO.length; j ++){
                monthTotal += att[i].monthlyCostDTO[j].cost;
            }
            this.barChartData.push(monthTotal);
        }

        this.cd.detectChanges();
        this.setBarChartLabels(att);
        this.cd.detectChanges();
    }
    // used to set the labels under the chart
    setBarChartLabels(att: RoleAttendance[]): void{
        let rolesLabels = new Array<string>();
        this.barChartLabels     = new Array();


        for(let i=0; i < att.length ; i++){
            let role = att[i].role;
            rolesLabels.push(role);
        }

        this.barChartLabels = rolesLabels;

    }


    public barChartOptions:any = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
}
