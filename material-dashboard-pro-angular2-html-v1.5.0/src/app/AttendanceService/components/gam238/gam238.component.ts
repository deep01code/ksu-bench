import {Component, OnInit, ViewChild} from '@angular/core';
import {Formv2Component} from '../commonComponents/formv2/formv2.component';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {Formv2Service} from '../../services/commonServices/formService/formv2.service';
import * as pivotJson from "json-to-pivot-json";
import { Angular2Csv } from 'angular2-csv';
import * as moment from "moment";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

@Component({
    selector: 'app-gam238',
    templateUrl: './gam238.component.html',
    styleUrls: ['./gam238.component.scss']
})
export class Gam238Component implements OnInit {
    @ViewChild(Formv2Component) form: Formv2Component
    public startDate: Date;
    public endDate: Date;
    public isLoading: boolean = false;
    public rawData: any;
    public calcCost: boolean = false;
    public roleSummary: boolean = false;
    constructor(private config: DataTableConfigService, private api: Formv2Service) { }

    ngOnInit() {
        this.configuration.resizeColumn = true;
    };


    formSubmited(e){
        this.data = [{}];
        this.rawData=e;
        this.prepareDataTable();
    }

    toggleChange(e){
        this.prepareDataTable()
    }

    prepareDataTable(){
            this.columns = [
            {title: "Project", key:"project"},
            {title: "Role", key:"role"},
        ];

        let input = this.rawData.data
        let options = {
            row: ["project", "role"],
            column: "month",
            value: this.calcCost?"cost":"days",
            totalFlag: true
        };

        if(!this.roleSummary){
            options.row.push("location");
            this.columns.push({title: "Location", key: "location"})
        }

        if(this.rawData.data.length && this.rawData.data[0].name){
            this.columns.push({title: "Employee name", key: "name"})
            options.row.push("name");
        }




        this.data = pivotJson(input, options);
        let months = this.removeEmptyMonths();
        this.columns = this.columns.concat(months);

        this.columns.push({title: "Total", key: "total"})
    };

    public removeEmptyMonths(){
        let months = this.rawData.months;
        let index = 0;
        console.log(this.data);
        console.log(months);
        for(let month of months){
            console.log(month["key"])
            console.log(this.data[1][month["key"]])
            if(!this.data[1][month["key"]]){
                months.splice(index, 1);
                console.log(months)
            }
            index++;
        }
        return months;
    }

    public columns: any[] = [
    ];
    public data: any[] = [{}];
    public configuration = this.config.getConfig();
    eventEmitted(e){  }

    public getCsv(){

        var data=[];
        var temp=this.rawData.data;
        /*        <td>{{row.name}}</td>
                  <td>{{row.count}}</td>
        */
        let header = {};
        for(let item of this.columns){
            header[item.key] = item.title;
        }

        data.push(header);
        let report = this.data;
        report.forEach(function (item) {
            for(let i in header){
                if(!item[i]) {
                    item[i] = "";
                }
            }
        })
        let obj = {project: "", role:""}
        if(this.data[0].name){
            obj["name"] = "";
        }

        report[0] = {...obj, ...report[0]}
        data = [...data, ...this.data];
        new Angular2Csv(data,"attendance report "+moment().format('LLL'));
    }

}
