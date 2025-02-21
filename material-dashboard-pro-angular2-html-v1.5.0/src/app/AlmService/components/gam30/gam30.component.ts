import {AfterViewInit, Component, OnInit,Input, OnChanges} from '@angular/core';
import { Release } from '../../classes/release';
import { NameCount } from '../../classes/name-count';
import { Gam30Service } from '../../services/gam30/gam30.service';
import {ReleaseService} from '../../services/release/release.service';
import {Angular2Csv} from 'angular2-csv';
import * as moment from "moment";
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import swal from "sweetalert2";


@Component({
  selector: 'app-gam30',
  templateUrl: './gam30.component.html',
  styleUrls: ['./gam30.component.scss']
})
export class Gam30Component implements OnInit {

    constructor(private api: Gam30Service,
                private defectApi: ReleaseService,
                private config: DataTableConfigService) { }

    releases:Release[];
    reopenTicket:NameCount[];
    crNamesAndCount:NameCount[];
    public type: string="defect";
    public isLoading: boolean = false;
    public releaseId:number;
    public devName: string;
    @Input() selectedRelease: number;

  ngOnInit() {
  }

    getResult(): void{
        this.isLoading = true;
        this.defectApi.getReleases(this.type)
            .subscribe(
                data=>{
                            this.releases=data;
                            this.releaseId = this.selectedRelease
                            this.getReOpenTicket(this.selectedRelease);
                            this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                });
    }
    
    getReOpenTicket(id): void{
      this.isLoading = true;
      this.configuration.isLoading = true;
        this.api.getReOpenTicket(id)
            .subscribe(
                data=>{
                        this.reopenTicket=data;
                        this.isLoading = false;
                        this.configuration.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                    this.configuration.isLoading = false;
                });
    }
    
    select(id):void{
        this.releaseId = id;
        this.reopenTicket = [new NameCount()]
        this.getReOpenTicket(id)
    }


    getCsv() {

        var data=[];
        var temp=this.reopenTicket;
        data.push({name:"name",count:"count"})

        temp.forEach(function (item) {

            if(item.name==undefined){item.name=""}
            if(item.count==undefined){item.count=0}


            data.push({name:item.name,count:item.count})
        })
        new Angular2Csv(data,"list of ReOpen ticker per Developer Report "+moment().format('LLL'));

    }
/******************/
    getCrNameOnClickDevNameInRelease(releaseId:number,developerName:string):void{
        this.isLoading = true;
        this.api.getCrNameOnClickDevName(releaseId,developerName)
            .subscribe(data=>{
                    this.crNamesAndCount=data
                    this.mAlert(data);
                    this.isLoading = false;
            },
                (error) => {
                    this.isLoading = false;
            })
    }


    tableClicked(developerName:string){
        this.devName = developerName;
        this.getCrNameOnClickDevNameInRelease(this.releaseId,developerName);

    }

    public mAlert(data:NameCount[]):void {
            swal({
                title: '<p>' + this.devName + '</a>',
                buttonsStyling: false,
                //timer: 4000, // to hide the modal after 4 sec
                confirmButtonClass: 'btn btn-success',
                html:`<div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr style="font-size: 15px">
                        <th>CR Name</th>
                        <th>Count</th>
                    </tr>
                    `+ this.getTableBody(data) +`
                
                </thead>
                <tbody>
                    
                </tbody>
                </table>
                </div>`,
                width: '50%'
            }).then(
                function () {},
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer')
                    }
                }).catch(swal.noop);
    }

    getTableBody(data:NameCount[]):string{
        let tags = "";
        for (var i=0;i<data.length;i++){
            tags += "<tr style=\"font-size: 15px\;  color: black\">";
            tags+="<td>"+data[i].name+"</td>";
            tags+="<td>"+data[i].count+"</td>";
            tags+= "</tr>"
        }

        return tags;
    }
/******************/

    configuration = this.config.getConfig();
    columns = [
        {title: "Developer Name", key: "name"},
        {title: "Count of tickets", key: "count"}
    ];
    data=[];

    eventEmitted($event){
        if($event.value.row){
            this.tableClicked($event.value.row.name);
        }
    }
    
    ngOnChanges(){
        if(this.selectedRelease){          
            this.getResult();
        }
    }
}
