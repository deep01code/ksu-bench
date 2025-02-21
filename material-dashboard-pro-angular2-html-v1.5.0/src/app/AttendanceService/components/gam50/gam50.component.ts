import {Component, OnInit, ViewChild} from '@angular/core';
import { RoleCost } from '../../classes/gam50/role-cost';
import { Gam50Service } from '../../services/gam50/gam50.service'
import { RoleAttendanceEntriesDto} from '../../classes/gam50/role-attendance-entries-dto';
import { RoleAttendance } from '../../classes/gam50/role-attendance';
import {FormComponent} from '../commonComponents/form/form.component';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';


@Component({
    selector: 'app-gam50',
    templateUrl: './gam50.component.html',
    styleUrls: ['./gam50.component.scss']
})
export class Gam50Component implements OnInit {
    actualMonths:Array<string>;
    rolesCosts:RoleCost[];
    roleCost:RoleCost;
    selectedProjects:string[];
    selectedRoles:string[];
    selectedYear:string;
    attendance:RoleAttendance[];
    maxMonth:number = 0;
    isLoading: boolean = false;
    yearMonthes:string[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    @ViewChild(FormComponent) form: FormComponent

    constructor(private api: Gam50Service,
                private config: DataTableConfigService) { }

    ngOnInit() { }

    ngAfterViewInit(){

    }

    setActualMonths(arr:RoleAttendance[]): void{
        this.actualMonths = new Array<string>();
        this.maxMonth = arr[0].monthlyCostDTO.length
        this.columns = [{title: "Role", key:"role"}];
        for (var i:number = 0;i<this.maxMonth;i++){
            this.actualMonths.push(this.yearMonthes[i]);
            this.columns.push({title: this.yearMonthes[i],
                key:this.yearMonthes[i]})
        }
    }

    submitForm(e: any){
        //RoleAttendanceEntriesDto
        //console.log(e+ " this is test");
        //console.log(arr+ " this is test arr");
        this.data = [{}]
        this.actualMonths = new Array<string>();
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.api.getAttendance(e)
            .subscribe(attendance => {
                this.setAttendance(attendance);
                this.setActualMonths((attendance));
                this.isLoading = false;
                this.configuration.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                    this.configuration.isLoading = false;
                });

    }



    getRoleCost(roleName): void{
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.api.getRoleCost(roleName)
            .subscribe((roleCost) => {
                this.roleCost = roleCost;
                this.isLoading = false;
                this.configuration.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                    this.configuration.isLoading = false;
                })
    }

    getRolesCosts(): void{
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.api.getRolesCosts()
            .subscribe((rolesCosts) => {
                this.rolesCosts = rolesCosts;
                this.isLoading = false;
                this.configuration.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                    this.configuration.isLoading = false;
                })
    }

    addRoleCost(roleCost:RoleCost): void {
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.api.addRoleCost(roleCost)
            .subscribe(roCost =>{
                this.roleCost = roCost;
                this.isLoading = false;
                this.configuration.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                    this.configuration.isLoading = false;
                })
    }

    setAttendance(arr:RoleAttendance[]):void{
        this.data = [];

        for(let i = 0; i < arr.length; i++){
            let str = "{";
            str+= "\"role\": \""+arr[i].role+"\"";
            for(let j = 0; j < arr[i].monthlyCostDTO.length; j++){
                str+= ", \""+this.yearMonthes[j]+"\": "+arr[i].monthlyCostDTO[j].cost+"";
            }
            str+="}";
            this.data.push(JSON.parse(str))
        }
        //this.data = JSON.parse(str)
        console.log(this.data)
    }

    configuration = this.config.getConfig();
    columns = [
        {title: "Role", key: "role"},
        {title: this.yearMonthes[0], key: this.yearMonthes[0]},
        {title: this.yearMonthes[1], key: this.yearMonthes[0]},
        {title: this.yearMonthes[2], key: this.yearMonthes[0]},
        {title: this.yearMonthes[3], key: this.yearMonthes[0]},
        {title: this.yearMonthes[4], key: this.yearMonthes[0]},
        {title: this.yearMonthes[5], key: this.yearMonthes[0]},
        {title: this.yearMonthes[6], key: this.yearMonthes[0]},
        {title: this.yearMonthes[7], key: this.yearMonthes[0]},
        {title: this.yearMonthes[8], key: this.yearMonthes[0]},
        {title: this.yearMonthes[9], key: this.yearMonthes[0]},
        {title: this.yearMonthes[10], key: this.yearMonthes[0]},
        {title: this.yearMonthes[11], key: this.yearMonthes[0]},
        {title: this.yearMonthes[12], key: this.yearMonthes[0]},
    ];
    data=[];

    eventEmitted($event){
    }
}
