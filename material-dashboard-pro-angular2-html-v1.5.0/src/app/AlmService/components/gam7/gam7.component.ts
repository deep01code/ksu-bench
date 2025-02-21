import {AfterViewInit, Component, OnInit, Input, OnChanges} from '@angular/core';
import {Release} from '../../classes/release';
import {NameCount} from '../../classes/name-count';
import {NameBugStatus} from '../../classes/gam7/name-bug-status';
import {Gam7Service} from '../../services/gam7/gam7.service';
import {HttpClient} from '@angular/common/http';
import {ReleaseService} from '../../services/release/release.service';
import {Angular2Csv} from 'angular2-csv';
import * as moment from "moment";
import swal from "sweetalert2";
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';

@Component({
  selector: 'app-gam7',
  templateUrl: './gam7.component.html',
  styleUrls: ['./gam7.component.scss']
})
export class Gam7Component implements OnInit {

  constructor(private api:Gam7Service,
              private releaseApi: ReleaseService,
              private config: DataTableConfigService){}

    result:Release[];
    bugs:NameBugStatus[];
    defectsStatusesPerTester:NameBugStatus[];

    public type: string = "defect";
    public isLoading: boolean = false;
    public releaseId:number;
    @Input() selectedRelease: number;

    ngOnInit(){
    }


    getResult(): void{
        this.isLoading = true;
        this.releaseApi.getReleases(this.type)
            .subscribe(
                (data)=>{
                                this.result=data;
                                this.releaseId = this.selectedRelease
                                this.getTesterBugs(this.selectedRelease);
                                this.isLoading = false;
                            },
                (error) => {
                    this.isLoading = false
                });

    }

    getTesterBugs(id):void {
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.api.getTesterDefects(id)
            .subscribe(
                (data)=>{
                                this.bugs=data;
                                this.isLoading = false;
                                this.configuration.isLoading = false;
                            },
                (error) => {
                                this.isLoading = false;
                                this.configuration.isLoading = false;
                    })
    }

    select(id):void{
        this.bugs = [new NameBugStatus()];
        this.releaseId = id;
        this.getTesterBugs(id);
    }

    getCsv() {

        var data=[];
        var temp=this.bugs;
        /*        <td>{{row.name}}</td>
                  <td>{{row.count}}</td>
        */
        data.push({name:"Tester",open:"Open",closed:"Closed",deferred:"Deferred"
                ,duplicate:"Duplicate",fixed:"Fixed",New:"New",readyToTest:"Ready To Test"
                ,released:"Released",rejected:"Rejected",reopen:"Reopen",total:"total"})

        temp.forEach(function (item) {

            if(item.name==undefined){item.name=""}
            if(item.open==undefined){item.open=0}
            if(item.closed==undefined){item.closed=0}
            if(item.deferred==undefined){item.deferred=0}
            if(item.duplicate==undefined){item.duplicate=0}
            if(item.fixed==undefined){item.fixed=0}
            if(item.nEw==undefined){item.nEw=0}
            if(item.readyToTest==undefined){item.readyToTest=0}
            if(item.released==undefined){item.released=0}
            if(item.rejected==undefined){item.rejected=0}
            if(item.reopen==undefined){item.reopen=0}
            if(item.total==undefined){item.total=0}


            data.push({name:item.name,open:item.open,closed:item.closed,deferred:item.deferred,
                        duplicate:item.duplicate,fixed:item.fixed,New:item.nEw,readyToTest:item.readyToTest,
                        released:item.released,rejected:item.rejected,reopen:item.reopen,total:item.total})
        })
        new Angular2Csv(data,"Defects Statuses Per Tester Report "+moment().format('LLL'));

    }


    getDefectsStatusesPerTesterInRelease(releaseId:number,testerName:string):void{
        this.isLoading = true;
        this.api.getTesterDefectsStatusesInReleasePerCR(releaseId,testerName)
            .subscribe(data=>{
                    this.defectsStatusesPerTester=data
                    this.mAlert(data);
                    this.isLoading = false;
            },
                (error) => {
                    this.isLoading = false;
            })
    }


    tableClicked(testerName:string){
        console.log(testerName);
        this.getDefectsStatusesPerTesterInRelease(this.releaseId,testerName);

    }

    public mAlert(data:NameBugStatus[]):void {
            swal({
                title: 'Tester Defects Details',
                buttonsStyling: false,
                //timer: 4000, // to hide the modal after 4 sec
                confirmButtonClass: 'btn btn-success',
                html:`<div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr style="font-size: 15px">
                        <th>CR Name</th>
                        <th>Open</th>
                        <th>Closed</th>
                        <th>Deferred</th>
                        <th>Duplicate</th>
                        <th>Fixed</th>
                        <th>New</th>
                        <th>Ready To Test</th>
                        <th>Released</th>
                        <th>Rejected</th>
                        <th>Reopen</th>
                        <th>total</th>
                    </tr>
                    `+ this.getTableBody(data) +`
                
                </thead>
                <tbody>
                    
                </tbody>
                </table>
                </div>`,
                width: '90%'
            }).then(
                function () {},
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer')
                    }
                }).catch(swal.noop);
    }

    getTableBody(data:NameBugStatus[]):string{
        let tags = "";

        for (var i=0;i<data.length;i++){
            tags += "<tr style=\"font-size: 15px\;  color: black\">";
            tags+="<td>"+data[i].name+"</td>";
            tags+="<td>"+data[i].open+"</td>";
            tags+="<td>"+data[i].closed+"</td>";
            tags+="<td>"+data[i].deferred+"</td>";
            tags+="<td>"+data[i].duplicate+"</td>";
            tags+="<td>"+data[i].fixed+"</td>";
            tags+="<td>"+data[i].nEw+"</td>";
            tags+="<td>"+data[i].readyToTest+"</td>";
            tags+="<td>"+data[i].released+"</td>";
            tags+="<td>"+data[i].rejected+"</td>";
            tags+="<td>"+data[i].reopen+"</td>";
            tags+="<td>"+data[i].total+"</td>";
            tags+= "</tr>"
        }

        return tags;
    }

    configuration = this.config.getConfig();

    columns = [
        {title: "Tester", key: "name"},
        {title: "Open", key: "open"},
        {title: "Closed", key: "closed",},
        {title: "Deferred", key: "deferred",},
        {title: "Duplicate", key: "duplicate",},
        {title: "Fixed", key: "fixed",},
        {title: "New", key: "nEw"},
        {title: "Ready To Test", key: "readyToTest"},
        {title: "Released", key: "released"},
        {title: "Rejected", key: "rejected"},
        {title: "Reopen", key: "reopen"},
        {title: "total", key: "total"}
    ];
    data=[];

    eventEmitted($event){
        if($event.value.row){
            console.log($event.value.row)
            this.tableClicked($event.value.row.name);
        }
    }
    
    ngOnChanges(){
        if(this.selectedRelease){
                this.getResult();
        }
    }
}
